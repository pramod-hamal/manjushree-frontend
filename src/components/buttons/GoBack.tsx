import { CaretLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";

export interface GoBackProps {
  route?: string;
}

export default function GoBack({ route }: GoBackProps) {
  const router = useRouter();

  /**
   * Routes to previous page or to a certain routes
   * @returns {void}
   */
  const goBack = (): void => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <div
      className="text-primary-title cursor-pointer flex gap-3 items-center"
      onClick={goBack}
    >
      <CaretLeftOutlined />
      <>Go Back</>
    </div>
  );
}
