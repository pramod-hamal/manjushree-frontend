import React from "react";
import Link from "next/link";

export interface RedirectProps {
  path: string;
  title: string;
  className?: string;
}

export default function Redirect({ path, title, className }: RedirectProps) {
  return (
    <Link href={path} className={`no-underline  ${className}`}>
      <p className="text-primary-title font-semibold">{title}</p>
    </Link>
  );
}
