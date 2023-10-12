import React, { useState } from "react";
import { FileImageFilled, PlusOutlined } from "@ant-design/icons";

import Documents from "./Documents";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";
import usePlanDocumentList from "./hook/usePlanDocumentList";

export default function DocumentsList() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, isLoading } = usePlanDocumentList();

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 ">
      <div className="flex justify-between items-center w-full">
        <span className="text-lg font-semibold m-0 pb-5">Plan Documents</span>
        <div>
          <FlatButton
            title="Add New"
            icon={<PlusOutlined />}
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <div className="flex gap-5 overflow-auto pb-5 px-3">
        {data?.data.length === 0 ? (
          <div className="text-center">No Documents</div>
        ) : (
          data?.data.map((document: any, index: number) => {
            return (
              <a
                className="w-[200px] text-gray-600 hover:scale-105 transition-all hover:text-black hover:shadow"
                key={index}
                download={true}
                target="_blank"
                href={document?.document.path}
              >
                <div className="flex flex-col hover:shadow-lg cursor-pointer p-3 items-center text-center gap-3 border-1 rounded-xl">
                  <FileImageFilled className="text-primary-button text-4xl" />
                  <span className="text-xs ">
                    {document?.document.title}
                  </span>
                  <span className="text-xs font-bold truncate">
                    {document?.document.metaData.mimetype}
                  </span>
                </div>
              </a>
            );
          })
        )}
      </div>
      <CusModal show={showModal} onClose={() => setShowModal(false)}>
        <Documents onClose={() => setShowModal(false)} />
      </CusModal>
    </div>
  );
}
