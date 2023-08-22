import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import ContactForm from "./ContactForm";
import { useGetAllQuery } from "@/store/features/participants/contact/apiSliceleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  contactDetailState,
  toogleModal,
} from "@/store/features/participants/contact/contactDetailSliceleanq_support_coordinator";

export default function ContactList() {
  const { participantDetail } = useAppSelector(participantDetailState);
  const { contactList, showModal } = useAppSelector(contactDetailState);
  const { isLoading } = useGetAllQuery(participantDetail?.id);

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Contact"
          onClick={() => dispatch(toogleModal(true))}
        />
      </div>
      <div>
        <CusTable
          columns={columns}
          dataSource={contactList}
          loading={isLoading}
        />
      </div>
      <CusModal
        width={625}
        show={showModal}
        onClose={() => dispatch(toogleModal(false))}
      >
        <ContactForm />
      </CusModal>
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
