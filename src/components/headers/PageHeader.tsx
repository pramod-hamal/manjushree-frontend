import React from "react";

export interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return <div className="py-5 text-2xl">{title}</div>;
}
