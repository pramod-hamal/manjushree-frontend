import React from "react";
import { CircularLoader } from "../loaders/CircularLoader";

export interface FlatButtonProps {
  title: string;
  icon?: any;
  onClick?: any;
  color?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

export default function FlatButton(flatButtonProps: FlatButtonProps) {
  const {
    title,
    icon,
    onClick,
    loading,
    color,
    type = "button",
  }: FlatButtonProps = flatButtonProps;
  if (loading === true) {
    return <CircularLoader />;
  }
  return (
    <button
      onClick={onClick ? () => onClick() : () => {}}
      type={type}
      className={`rounded-sm cursor-pointer hover:scale-105 transition-all ${
        color ?? "bg-primary-button text-white border-0"
      } px-4 py-2 flex gap-4 items-center`}
    >
      {icon && <span>{icon}</span>}
      <span className="text-[16px]"> {title}</span>
    </button>
  );
}

export const CancelButton = ({ onClick }: any) => {
  return (
    <FlatButton
      title="Cancel"
      onClick={onClick}
      color="text-black bg-white border-0"
    />
  );
};
