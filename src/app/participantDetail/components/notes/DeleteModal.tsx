import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal, {
  CusModalProps,
} from "@/components/modals/Modalleanq_support_coordinator";
import Image from "next/image";
import React from "react";

export default function DeleteModal(props: CusModalProps) {
  const { show, onClose } = props;
  return (
    <CusModal show={show} onClose={onClose}>
      <div className="flex flex-col gap-5 items-center justify-center p-5">
        <Image
          className="w-full h-60"
          src="/images/delete-note.svg"
          height={100}
          width={100}
          alt="Login Image"
        />
        <span className="font-semibold text-sm">
          Are you sure you want to delete?
        </span>
        <div className="flex gap-5 items-center">
          <FlatButton
            title="Cancel"
            onClick={() => {}}
            color="text-black bg-white shadow border"
          />
          <FlatButton
            title="Delete"
            color="bg-primary-danger text-white border-0"
            onClick={() => {}}
          />
        </div>
      </div>
    </CusModal>
  );
}
