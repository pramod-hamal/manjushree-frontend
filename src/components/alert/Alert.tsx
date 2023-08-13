import React from "react";

export interface AlertProps {
  title: string;
  content: string;
  type: string;
  to: string;
}

export default function Alert({ title, content, type, to }: AlertProps) {
  const getColorByType = () => {
    switch (type) {
      case "danger":
        return "bg-alert-danger";
      case "warning":
        return "bg-alert-warning";
      default:
        return "bg-alert-success";
    }
  };

  return (
    <div className={`p-5 ${getColorByType()}`}>
      <p>{title}</p>
      <p>{content}</p>
    </div>
  );
}
