import { ZodFormattedError } from "zod";

export type ReturnResponse<T> =
  | {
    data: T;
    error?: never;
  }
  | {
    data?: never;
    error: ErrorResponse<T>;
  };

export type ErrorResponse<T> =
  | {
    zodError: ZodFormattedError<T>;
    customError?: never;
  }
  | {
    zodError?: never;
    customError: string;
  };
