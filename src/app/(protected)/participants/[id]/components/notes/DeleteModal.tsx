import React from "react";
import Image from "next/image";

import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

export interface DeleteModalProps {
  show: boolean;
  onClose: any;
  onDelete: any;
  loading?: boolean;
}

export default function DeleteModal(props: DeleteModalProps) {
  const { show, onClose, onDelete, loading } = props;
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
          <CancelButton onClick={onClose} />
          <FlatButton
            loading={loading}
            title="Delete"
            color="bg-primary-danger text-white border-0"
            onClick={onDelete}
          />
        </div>
      </div>
    </CusModal>
  );
}
