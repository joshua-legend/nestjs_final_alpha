import { RESPONSE_CODE } from '../constants/response-code.constant';

export type ApiResponse<T> = {
  success: boolean;
  code: keyof typeof RESPONSE_CODE;
  message: string;
  data: T;
  timestamp: string;
};
