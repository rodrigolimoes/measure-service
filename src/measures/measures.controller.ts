import { Service } from "@src/measures/measures.service";
import { NextFunction, Request, Response } from "express";

export class MeasuresController {
  constructor(private service: Service) {}

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { image } = req.body;

      const response = await this.service.analyze({ image });

      res.send({
        image_url: "",
        measure_value: response,
        measure_uuid: "",
      });
    } catch (e) {
      next(e);
    }
  };
}
