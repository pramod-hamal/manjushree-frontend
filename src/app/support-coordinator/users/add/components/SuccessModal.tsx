import CusModal, {
  CusModalProps,
} from "@/components/modals/Modalleanq_support_coordinator";
import Image from "next/image";
import React from "react";

export default function SuccessModal(props: CusModalProps) {
  const { show, onClose } = props;
  return (
    <CusModal show={show} onClose={onClose}>
      <div className="flex flex-col gap-2 items-center justify-center p-5">
        <Image
          className="w-full h-60"
          src="/images/user-success.svg"
          height={100}
          width={100}
          alt="Login Image"
        />
        <div className="w-[400px] flex flex-col text-center">
          <span className="font-semibold text-sm pt-5">User is added</span>
          <span className="text-sm text-gray-400 text-center p-3">
            New User has been added, please create a plan or cancel to go back
          </span>
        </div>
      </div>
    </CusModal>
  );
}
