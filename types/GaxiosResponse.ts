export interface GaxiosResponse<T = any> {
  config: any;
  data: T;
  status: number;
  statusText: string;
  headers: any;
  request: any;
}
