import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";

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
import {
  useDeleteDocumentMutation,
  useGetAllDocumentsQuery,
} from "@/store/features/participants/documents/apiSliceleanq_support_coordinator";
import { Skeleton } from "antd";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import DeleteModal from "@/components/modals/DeleteModalleanq_support_coordinator";

export default function DocumentsList() {
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const showToast = useToast();
  const dispatch = useAppDispatch();
  const { participantDetail } = useAppSelector(participantDetailState);
  const { isLoading } = useGetAllDocumentsQuery(participantDetail?.id);
  const { documentList, showModal } = useAppSelector(participantDocumentState);

  const toogleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    dispatch(toogleModal(false));
  }, [dispatch]);

  const [deleteDocument, { isLoading: documentDeleteLoading }] =
    useDeleteDocumentMutation();

  const handleDocumentDelete = async () => {
    try {
      const { data, error }: any = await deleteDocument(toDeleteId);
      if (data) {
        toogleDeleteModal();
        showToast({ title: "Document Deleted", type: "success" });
        setToDeleteId(null);
      } else {
        const errorData: APIBaseResponse<any> = error.data;
        showToast({ title: errorData.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumns = [
    ...columns,
    {
      title: "Actions",
      width: 200,
      render: (data: any) => {
        return (
          <div className="flex gap-5 items-center">
            <EyeOutlined className="text-primary-grey" />
            <EditOutlined className="text-primary-button" />
            <a download target="_blank" href={data.document.path}>
              <DownloadOutlined className="text-primary-green cursor-pointer" />
            </a>
            <DeleteOutlined
              className="text-primary-danger"
              onClick={() => {
                toogleDeleteModal();
                setToDeleteId(data.id);
              }}
            />
          </div>
        );
      },
    },
  ];

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
        {isLoading ? (
          <Skeleton />
        ) : (
          <CusTable
            columns={actionColumns}
            dataSource={documentList}
            loading={isLoading}
          />
        )}
      </div>
      <CusModal
        show={showModal}
        onClose={() => {
          dispatch(toogleModal(false));
        }}
      >
        <NewDocumentForm />
      </CusModal>
      <DeleteModal
        show={deleteModal}
        onClose={toogleDeleteModal}
        onDelete={() => handleDocumentDelete()}
        loading={documentDeleteLoading}
      />
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
];
