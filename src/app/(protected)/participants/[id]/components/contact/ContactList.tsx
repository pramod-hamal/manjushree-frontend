import React, { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import {
  useDeleteContactMutation,
  useGetAllQuery,
} from "@/store/features/participants/contact/apiSliceleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  contactDetailState,
  toogleModal,
} from "@/store/features/participants/contact/contactDetailSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";

import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";

import ContactForm from "./ContactForm";
import DeleteModal from "@/components/modals/DeleteModalleanq_support_coordinator";

export default function ContactList() {
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toogleDeleteModal = () => setDeleteModal(!deleteModal);

  const showToast = useToast();
  const dispatch = useAppDispatch();
  const { participantDetail } = useAppSelector(participantDetailState);
  const { isLoading } = useGetAllQuery(participantDetail?.id);
  const { contactList, showModal } = useAppSelector(contactDetailState);

  const [deleteContact, { isLoading: deleteContactLoading }] =
    useDeleteContactMutation();

  const handleContactDelete = async () => {
    try {
      const { data, error }: any = await deleteContact(toDeleteId);
      if (data) {
        toogleDeleteModal();
        showToast({ title: "Contact Deleted", type: "success" });
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

  useEffect(() => {
    dispatch(toogleModal(false));
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Contact"
          onClick={() => {
            dispatch(toogleModal(true));
          }}
        />
      </div>
      <div>
        <CusTable
          columns={actionColumns}
          dataSource={contactList}
          loading={isLoading}
        />
      </div>
      <CusModal
        width={625}
        show={showModal}
        onClose={() => {
          dispatch(toogleModal(false));
        }}
      >
        <ContactForm />
      </CusModal>
      <DeleteModal
        show={deleteModal}
        onClose={toogleDeleteModal}
        onDelete={() => handleContactDelete()}
        loading={deleteContactLoading}
      />
    </div>
  );
}

const columns: any[] = [
  { title: "Full Name", dataIndex: ["contact", "name"] },
  { title: "Email", dataIndex: ["contact", "email"] },
  { title: "Phone No", dataIndex: ["contact", "phone"] },
  { title: "Relation", dataIndex: "relation" },
  { title: "Organization", dataIndex: ["contact", "organization"] },
];
