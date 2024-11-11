import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "./interceptor";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    // message 는 "" 일수도 있어서 || 으로 처리
    const message = exception.message || "Error Occurred";

    console.log(response);
    const res: ApiResponse<null> = {
      data: null,
      statusCode,
      message,
    };

    response.status(statusCode).json({ ...res });
  }
}
