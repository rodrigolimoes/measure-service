import { StatusCodes } from "@src/common/enums/statusCodes";

export interface HttpError {
  /**
   * Error Name
   */
  name?: string;
  /**
   * A short description of the HTTP error
   */
  message?: string;
  /**
   * Http Status code
   */
  statusCode?: number;

  /**
   * Error Code
   */
  errorCode: string;
}

/**
 * Http Exception Error
 *
 * @example
 * `throw new HttpException({statusCode: 500, message: "Something went wrong"})`
 *
 */
export class HttpException extends Error {
  public statusCode: number;
  public errorCode: string;

  /**
   * @param {HttpError} error - Http Exception Error option
   * @param {number} [error.statusCode = 500] - Http Status code
   * @param {string | undefined} error.message - A short description of the HTTP error
   */
  constructor({ statusCode, message, errorCode }: HttpError) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.errorCode = errorCode;
  }
}
