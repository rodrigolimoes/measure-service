import { Service } from "@src/measures/measures.service";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";
import { MeasureDto } from "@src/measures/dtos/measure.dto";
import { MeasureConfirmDto } from "@src/measures/dtos/measureConfirm.dto";
import { SearchDto } from "@src/measures/dtos/search.dto";
import { ParamDto } from "@src/measures/dtos/param.dto";

export class MeasuresController {
  constructor(private service: Service) {}

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { measure_type, measure_datetime, customer_code, image } =
        req.body as MeasureDto;

      const response = await this.service.create({
        measure_type,
        measure_datetime,
        customer_code,
        image,
      });

      res.send({
        image_url: response.image_url,
        measure_value: response.measure_value,
        measure_uuid: response.id,
      });
    } catch (e) {
      next(e);
    }
  };

  confirm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { confirmed_value, measure_uuid } = req.body as MeasureConfirmDto;

      await this.service.confirm({ confirmed_value, measure_uuid });

      res.send({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { customer_code } = req.params as ParamDto;
      const { measure_type } = req.query as SearchDto;
      const response = await this.service.find({
        customer_code,
        measure_type,
      });

      if (!Array.isArray(response) || response.length <= 0)
        throw new HttpException({
          statusCode: StatusCodes.NOT_FOUND,
          message: "Nenhuma leitura encontrada",
          errorCode: "MEASURES_NOT_FOUND",
        });

      res.send({
        customer_code,
        measures: response.map(
          ({ id, measure_date, has_confirmed, type, image_url }) => ({
            measure_uuid: id,
            measure_datetime: measure_date,
            measure_type: type,
            has_confirmed,
            image_url,
          })
        ),
      });
    } catch (e) {
      next(e);
    }
  };
}
