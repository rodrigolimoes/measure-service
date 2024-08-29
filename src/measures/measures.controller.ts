import { Service } from "@src/measures/measures.service";
import { NextFunction, Request, Response } from "express";

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
}
