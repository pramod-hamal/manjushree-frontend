import React from "react";

export interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="text-primary-danger p-0 text-sm">{message}</span>;
}
