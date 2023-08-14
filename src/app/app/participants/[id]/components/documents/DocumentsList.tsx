import React, { useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import NewDocumentForm from "./NewDocumentForm";

import { documents } from "@/constants/data/documentsleanq_support_coordinator";

export default function DocumentsList() {
  const [show, setShow] = useState<boolean>(false);

  const columns: any[] = [
    { title: "Name", dataIndex: "name" },
    { title: "File", dataIndex: "fileName" },
    { title: "Date", dataIndex: "date" },
    {
      title: "Actions",
      width: 200,
      render: () => (
        <div className="flex gap-5">
          <EyeOutlined className="text-primary-grey" />
          <EditOutlined className="text-primary-button" />
          <DownloadOutlined className="text-primary-green" />
          <DeleteOutlined className="text-primary-danger" />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex flex-row-reverse">
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Document"
          onClick={() => setShow(true)}
        />
      </div>
      <div>
        <CusTable columns={columns} dataSource={documents} loading={false} />
      </div>
      <CusModal
        show={show}
        style={{ right: "-34%", top: "34%", borderRadius: 0 }}
        onClose={() => {
          setShow(false);
        }}
      >
        <NewDocumentForm />
      </CusModal>
    </div>
  );
}
