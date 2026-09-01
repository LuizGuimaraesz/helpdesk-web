import { isAxiosError } from "axios";
import { ZodError } from "zod";

type ApiValidationIssue = {
  message?: string;
};

type ApiErrorResponse = {
  error?: string;
  message?: string;
  issues?: ApiValidationIssue[];
  errors?: ApiValidationIssue[];
};

export function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? fallbackMessage;
  }

  if (!isAxiosError<ApiErrorResponse>(error)) {
    return fallbackMessage;
  }

  const responseData = error.response?.data;

  return (
    responseData?.issues?.[0]?.message ??
    responseData?.errors?.[0]?.message ??
    responseData?.message ??
    responseData?.error ??
    fallbackMessage
  );
}
