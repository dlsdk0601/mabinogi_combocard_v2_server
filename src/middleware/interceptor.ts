import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export enum API_STATUS {
  OK = "OK",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  REQUIRED_SIGN_IN = "REQUIRED_SIGN_IN", // 비로그인 또는 refresh-token 까지 만료된 유저
}

export interface ApiResponse<T> {
  data: T;
  status: API_STATUS;
  statusCode: number;
  message: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
    return next
      .handle()
      .pipe(map((data) => ({ data, status: API_STATUS.OK, statusCode: 200, message: "" })));
  }
}
