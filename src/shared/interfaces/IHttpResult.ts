interface IHttpResult<T> {
  success: boolean;
  data: T;
  message?: string | string[];
}
