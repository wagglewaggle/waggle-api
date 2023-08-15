export interface ILoggingObject {
  success: boolean;
  startTime: string;
  endTime: string | null;
  elapsedTime: number | null;
  clientIp: string;
  method: string;
  url: string;
  params: any;
  query: any;
  header: any;
  body: any;
  error: any;
  errorStack: any;
  errorCode: any;
  errorMessage: any;
}
