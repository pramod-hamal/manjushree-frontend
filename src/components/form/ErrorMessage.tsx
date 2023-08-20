import React from "react";
import { ErrorMessageProps } from "./interface/form.interface";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="text-primary-danger p-0 text-sm">{message}</span>;
}
