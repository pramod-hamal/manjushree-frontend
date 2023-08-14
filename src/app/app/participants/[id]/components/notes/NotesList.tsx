import React, { useState } from "react";

import { Popover } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import NewNoteForm from "./NewNoteForm";

import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import { notes } from "@/constants/data/notesleanq_support_coordinator";
import DeleteModal from "./DeleteModal";

export default function NotesList() {
  const [show, setShow] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const noteMenuContent = () => (
    <div>
      <p onClick={handleEdit} className="cursor-pointer">
        Edit
      </p>
      <p onClick={handleDelete} className="cursor-pointer">
        Delete
      </p>
    </div>
  );

  const handleEdit = () => {};

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex items-center justify-between pb-5">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Note"
          onClick={() => setShow(true)}
        />
      </div>
      <>
        <span className="font-semibold text-lg">Notes</span>
        <div className="grid grid-cols-4 gap-5">
          {notes.map((note: any, index: number) => {
            return (
              <div
                key={index}
                className="border flex justify-between items-start border-solid p-5 rounded border-gray-400"
              >
                <span>{note.description}</span>
                <Popover
                  content={noteMenuContent}
                  placement="bottom"
                  trigger="click"
                >
                  <MoreOutlined />
                </Popover>
              </div>
            );
          })}
        </div>
      </>
      <CusModal
        show={show}
        style={{ right: "-34%", top: "34%", borderRadius: 0 }}
        onClose={() => {
          setShow(false);
        }}
      >
        <NewNoteForm />
      </CusModal>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
