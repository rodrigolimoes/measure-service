import { Service } from "@src/measures/measures.service";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";

export class MeasuresController {
  constructor(private service: Service) {}

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.create(req.body);

      res.send({
        image_url: response.imageUrl,
        measure_value: response.measureValue,
        measure_uuid: response.id,
      });
    } catch (e) {
      next(e);
    }
  };

  confirm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.confirm(req.body);

      res.send({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { customer_code } = req.params;
      const { measure_type } = req.query;
      const response = await this.service.find({
        customerCode: customer_code,
        type: measure_type as "WATER" | "GAS",
      });

      if (!Array.isArray(response) || response.length <= 0)
        throw new HttpException({
          statusCode: StatusCodes.NOT_FOUND,
          message: "Nenhuma leitura encontrada",
          errorCode: "MEASURES_NOT_FOUND",
        });

      res.send({
        customer_code,
        measures: response,
      });
    } catch (e) {
      next(e);
    }
  };
}
