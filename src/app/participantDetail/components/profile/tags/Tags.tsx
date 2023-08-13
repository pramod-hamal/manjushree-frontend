import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import Tag from "@/components/tag/Tagleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import TagForm from "./TagForm";

export default function ProfileTags() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex cursor-pointer justify-between bg-white items-center w-full pb-5">
        <span className="text-xl font-semibold">Tags</span>
      </div>
      <div className="flex py-2 gap-5 flex-wrap">
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Tag"
          onClick={() => setShow(true)}
          color="text-black bg-white border border-solid text-xs shadow border-[#1890FF] text-primary-title"
        />
        {[1, 1].map((tag: any, index: number) => {
          return (
            <div key={index}>
              <Tag title="Tag" onDelete={() => { }} onEdit={() => { }} />
            </div>
          );
        })}
        <CusModal
          onClose={() => setShow(false)}
          style={{ top: "34%", left: "-28%" }}
          show={show}
          width={300}
        >
          <TagForm />
        </CusModal>
      </div></>
  );
}
