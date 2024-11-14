import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { API_STATUS, ApiResponse } from "./interceptor";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    // message 는 "" 일수도 있어서 || 으로 처리
    const message = exception.message || "Error Occurred";

    const res: ApiResponse<null> = {
      data: null,
      statusCode,
      message,
      status: this.getStatus(exception.cause),
    };

    response.status(statusCode).json({ ...res });
  }

  // type safe 를 위해 맵핑을 한번 한다.
  getStatus(cause: unknown): API_STATUS {
    switch (cause) {
      case API_STATUS.OK:
      case API_STATUS.BAD_REQUEST:
      case API_STATUS.NOT_FOUND:
      case API_STATUS.INTERNAL_ERROR:
      case API_STATUS.TOKEN_EXPIRED:
      case API_STATUS.REFRESH_TOKEN_EXPIRED:
        return cause;
      default:
        return API_STATUS.INTERNAL_ERROR;
    }
  }
}
