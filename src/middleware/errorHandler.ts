import { HttpError } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorCode = err.errorCode ?? "";
  const statusCode = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message ?? "Something went wrong";

  return res.status(statusCode).send({
    error_code: errorCode,
    error_description: message,
  });
};
