import React from "react";
import Image from "next/image";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal, {
  CusModalProps,
} from "@/components/modals/Modalleanq_support_coordinator";

export default function SuccessModal(props: CusModalProps) {
  const { show, onClose } = props;
  return (
    <CusModal show={show} onClose={onClose}>
      <div className="flex flex-col gap-5 items-center justify-center p-5">
        <Image
          className="w-full h-60"
          src="/images/participant-success.svg"
          height={100}
          width={100}
          alt="Login Image"
        />
        <span className="font-semibold text-sm">Participant is added</span>
        <span className="text-sm text-gray-400 text-center">
          New Participant has been added, please create a plan or cancel to go
          back
        </span>
        <div className="flex gap-5 items-center">
          <FlatButton
            title="Cancel"
            onClick={() => {}}
            color="text-black bg-white shadow border"
          />
          <FlatButton title="Create Plan" onClick={() => {}} />
        </div>
      </div>
    </CusModal>
  );
}
