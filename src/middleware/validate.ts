import { ClassConstructor, plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validateOrReject, ValidationError } from "class-validator";
import { HttpException } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";

const getMessagesError = (err: Array<ValidationError>) => {
  let messages = [];

  for (let i = 0; i < err.length; i++) {
    const constraints = err[i]["constraints"];

    for (const key in constraints) {
      if (constraints) {
        messages.push(constraints[key]);
      }
    }
  }

  return messages;
};

type Target = "body" | "query" | "params";

export const validate =
  (target: Target = "body") =>
  (objDTO: ClassConstructor<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req[target]) {
        const dto = plainToInstance(objDTO, req[target]);
        await validateOrReject(dto);

        req[target] = dto;

        next();
      } else {
        next(new Error("Target validation is not valid"));
      }
    } catch (e) {
      next(
        new HttpException({
          statusCode: StatusCodes.BAD_REQUEST,
          message: getMessagesError(e as Array<ValidationError>)[0],
          errorCode: target === "query" ? "INVALID_TYPE" : "INVALID_DATA",
        })
      );
    }
  };
