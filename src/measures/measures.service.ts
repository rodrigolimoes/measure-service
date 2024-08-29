import { GenerativeModel } from "@google/generative-ai";
import { Between, Equal, Repository } from "typeorm";
import { Measure } from "./entity/measure.entity";
import { Utils as ImageUtils } from "@src/common/utils/image.utils";
import { HttpException } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";
import * as fs from "fs";

export interface Search {
  type?: "WATER" | "GAS";
  measureDate?: string;
}

export interface Service {
  analyze: (pathFile: string) => Promise<number>;
  create: (imageDto: {
    image: string;
    measure_datetime: string;
    measure_type: string;
    customer_code: string;
  }) => Promise<Measure>;
}

export class MeasuresService implements Service {
  constructor(
    private repository: Repository<Measure>,
    private geminiModel: GenerativeModel,
    private imageUtils: ImageUtils
  ) {}

  find = async ({ type, measureDate }: Search) => {
    let where = {};

    if (type) where = { ...where, type: Equal(type) };

    if (measureDate) {
      const date = new Date(measureDate);
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
        measureDate: Between(startDate, endDate),
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
  }: any) => {
    const measures = this.find({
      measureDate: measure_datetime,
      type: measure_type,
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
      imageUrl: url,
      measureDate: new Date(measure_datetime),
      customerCode: customer_code,
      hasConfirmed: false,
      measureValue: value,
    });

    return await this.repository.save(measure);
  };

  private analyze = async (pathFile: string) => {
    const result = await this.geminiModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(fs.readFileSync(pathFile)).toString("base64"),
          mimeType: "image/png",
        },
      },
      {
        text: "Analyze this water/gas meter reading from the image and return the meter value",
      },
    ]);

    return Number(
      result.response
        .text()
        .match(/(\d+(\.\d+)?)/g)
        ?.join(" ")
    );
  };
}
