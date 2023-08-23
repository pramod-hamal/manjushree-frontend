import React, { useEffect } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { defaultDateFormat } from "@/lib/date.utilsleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import NewDocumentForm from "./NewDocumentForm";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  participantDocumentState,
  toogleModal,
} from "@/store/features/participants/documents/participantDocumentSliceleanq_support_coordinator";
import { useGetAllDocumentsQuery } from "@/store/features/participants/documents/apiSliceleanq_support_coordinator";

export default function DocumentsList() {
  const dispatch = useAppDispatch();

  const { participantDetail } = useAppSelector(participantDetailState);

  const { isLoading } = useGetAllDocumentsQuery(participantDetail?.id);

  const { documentList, showModal } = useAppSelector(participantDocumentState);

  useEffect(() => {
    dispatch(toogleModal(false));
  }, []);

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex flex-row-reverse">
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Document"
          onClick={() => dispatch(toogleModal(true))}
        />
      </div>
      <div>
        <CusTable
          columns={columns}
          dataSource={documentList}
          loading={isLoading}
        />
      </div>
      <CusModal
        show={showModal}
        onClose={() => {
          dispatch(toogleModal(false));
        }}
      >
        <NewDocumentForm />
      </CusModal>
    </div>
  );
}

const columns: any[] = [
  { title: "Name", dataIndex: "name" },
  { title: "Category", dataIndex: "category" },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (createdAt: any) => {
      return <span>{defaultDateFormat(createdAt)}</span>;
    },
  },
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
