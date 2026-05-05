import { AppResponse } from './AppResponse';
import { BaseError } from '../Model/BaseError';

export class CreateAppResponse {
  static successResponse(
    message: string,
    data: any,
    statusCode: number = 200,
  ): AppResponse {
    return {
      statusCode: statusCode,
      message: message,
      data: data,
    } as AppResponse;
  }
  static errorResponse(error: BaseError | Error): AppResponse<null> {
    let code = 500;
    if (error instanceof BaseError) {
      code = error.statusCode;
    }
    return {
      statusCode: code,
      message: `${error.name}: ${error.message}`,
      data: null,
      error: error.cause,
    } as AppResponse;
  }
}
