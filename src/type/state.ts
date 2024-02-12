import { type HttpStatus, type HttpStatusError, type HttpStatusSuccess } from "~/utils/http_status";

type THttpStatusKeys = keyof typeof HttpStatus;

export type THttpStatusValue = (typeof HttpStatus)[THttpStatusKeys];

export type TCodeError = (typeof HttpStatusError)[keyof typeof HttpStatusError];

export type TErrors<T> = {
  errors: T;
};

export type TErrorResponse<T> = {
  code: TCodeError;
  status: string;
} & TErrors<T>;

export type TCodeSuccess =
  (typeof HttpStatusSuccess)[keyof typeof HttpStatusSuccess];

export type TMeta = {
  perPage: number;
  currentPage: number;
  lastPage: number;
  total: number;
  prev: number | null;
  next: number | null;
};

export type TSuccess<T> = {
  data: T;
  meta?: TMeta;
};

export type TSuccessResponse<T> = {
  code: TCodeSuccess;
  status: string;
} & TSuccess<T>;