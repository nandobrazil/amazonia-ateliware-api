export class ResponseResult<T> {
  success: boolean;
  data: T;
  statusCode: number;
  message?: string | string[];

  constructor(statusCode: number,success: boolean, data: T, message?: string | string[]) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
