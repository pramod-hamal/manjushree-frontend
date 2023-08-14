import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import ContactForm from "./ContactForm";
import { contacts } from "@/constants/data/contactsleanq_support_coordinator";

export default function ContactList() {
  const [show, setShow] = useState<boolean>(false);

  const columns: any[] = [
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phoneNo" },
    { title: "Relation", dataIndex: "relation" },
    { title: "Organization", dataIndex: "organization" },
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
          onClick={() => setShow(true)}
        />
      </div>
      <div>
        <CusTable columns={columns} dataSource={contacts} loading={false} />
      </div>
      <CusModal
        width={625}
        show={show}
        style={{ right: "-31%", top: "34%", borderRadius: 0 }}
        onClose={() => {
          setShow(false);
        }}
      >
        <ContactForm />
      </CusModal>
    </div>
  );
}
