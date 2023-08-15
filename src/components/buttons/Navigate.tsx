import React from "react";
import FlatButton from "./Button";
import Link from "next/link";

export interface NavigateButtonProps {
  title: string;
  link: string;
  icon: React.ReactNode;
}

export default function NavigateButton({
  title,
  link,
  icon,
}: NavigateButtonProps) {
  return (
    <Link className="no-underline" href={link}>
      <FlatButton title={title} icon={icon} />
    </Link>
  );
}
