import { GenerativeModel } from "@google/generative-ai";
import { Between, Equal, ILike, Repository } from "typeorm";
import { Measure } from "./entity/measure.entity";
import { Utils as ImageUtils } from "@src/common/utils/image.utils";
import { HttpException } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";
import { MeasureDto } from "@src/measures/dtos/measure.dto";
import { SearchDto } from "@src/measures/dtos/search.dto";
import { MeasureConfirmDto } from "@src/measures/dtos/measureConfirm.dto";
import * as fs from "fs";

export interface Service {
  analyze: (pathFile: string) => Promise<number>;
  create: (imageDto: MeasureDto) => Promise<Measure>;
  find: (searchDto: SearchDto) => Promise<Array<Measure>>;
  confirm: (confirmDto: MeasureConfirmDto) => Promise<Measure>;
}

export class MeasuresService implements Service {
  constructor(
    private repository: Repository<Measure>,
    private geminiModel: GenerativeModel,
    private imageUtils: ImageUtils
  ) {}

  find = async ({ measure_type, measure_date, customer_code }: SearchDto) => {
    let where = {};

    if (measure_type) where = { ...where, type: ILike(measure_type) };

    if (customer_code)
      where = { ...where, customer_code: Equal(customer_code) };

    if (measure_date) {
      const date = new Date(measure_date);
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      where = {
        measure_date: Between(startDate, endDate),
      };
    }

    return await this.repository.find({
      where,
    });
  };

  create = async ({
    image,
    measure_datetime,
    measure_type,
    customer_code,
  }: MeasureDto) => {
    const measures = await this.find({
      measure_type,
      measure_date: measure_datetime,
      customer_code,
    });

    if (Array.isArray(measures) && measures.length > 0) {
      throw new HttpException({
        statusCode: StatusCodes.CONFLICT,
        message: "Leitura do mês já realizada",
        errorCode: "DOUBLE_REPORT",
      });
    }

    const { url, path } = await this.imageUtils.save(image);

    const value = await this.analyze(path);

    const measure = this.repository.create({
      type: measure_type,
      image_url: url,
      measure_date: new Date(measure_datetime),
      customer_code: customer_code,
      has_confirmed: false,
      measure_value: value,
    });

    return await this.repository.save(measure);
  };

  analyze = async (pathFile: string) => {
    const result = await this.geminiModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(fs.readFileSync(pathFile)).toString("base64"),
          mimeType: "image/png",
        },
      },
      {
        text: "Analyze this water/gas meter reading from the image and return the meter value in the following template without the unit of measure `meter value: ${value}`. Change “${value}” to the identified value",
      },
    ]);

    return Number(result.response.text().replace("meter value: ", ""));
  };

  findOne = async (id: string) => {
    const measure = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!measure)
      throw new HttpException({
        statusCode: StatusCodes.NOT_FOUND,
        message: "Leitura do mês já realizada",
        errorCode: "MEASURE_NOT_FOUND",
      });

    return measure;
  };

  confirm = async ({ measure_uuid, confirmed_value }: MeasureConfirmDto) => {
    const measure = await this.findOne(measure_uuid);

    if (measure.has_confirmed)
      throw new HttpException({
        statusCode: StatusCodes.CONFLICT,
        message: "Leitura do mês já realizada",
        errorCode: "CONFIRMATION_DUPLICATE",
      });

    measure.has_confirmed = true;
    measure.measure_value = confirmed_value;

    return this.repository.save(measure);
  };
}
