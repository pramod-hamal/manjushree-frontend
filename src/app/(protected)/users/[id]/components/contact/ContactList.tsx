import React, { useState } from "react";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

import {
  useAllContactsQuery,
  useDeleteContactMutation,
} from "@/store/features/users/apiSliceleanq_support_coordinator";
import {
  UserSliceState,
  userState,
} from "@/store/features/users/userSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import ContactForm from "./ContactForm";
import DeleteModal from "@/components/modals/DeleteModalleanq_support_coordinator";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";

export default function ContactList() {
  const { userDetail }: UserSliceState = useAppSelector(userState);
  const { data, isLoading } = useAllContactsQuery(userDetail?.id!);

  const showToast = useToast();

  const [toDeleteId, setToDeleteId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toogleDeleteModal = () => setDeleteModal(!deleteModal);

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

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Contact"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div>
        <CusTable
          columns={actionColumns}
          dataSource={data?.data ?? []}
          loading={isLoading}
        />
      </div>
      <CusModal
        width={625}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ContactForm onClose={() => setShowModal(false)} />
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
