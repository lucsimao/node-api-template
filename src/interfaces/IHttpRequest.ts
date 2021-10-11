export interface IHttpRequest {
  headers?: {
    authorization?: string;
    [key: string]: unknown;
  };
  params?: {
    id?: string;
    [key: string]: unknown;
  };
  body: unknown;
}
