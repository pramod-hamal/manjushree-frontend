import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

import { useAllContactsQuery } from "@/store/features/users/apiSliceleanq_support_coordinator";
import {
  UserSliceState,
  userState,
} from "@/store/features/users/userSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";

export default function ContactList() {
  const { userDetail }: UserSliceState = useAppSelector(userState);
  const { data, isLoading } = useAllContactsQuery(userDetail?.id!);

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Contact"
          onClick={() => {}}
        />
      </div>
      <div>
        <CusTable
          columns={columns}
          dataSource={data?.data ?? []}
          loading={isLoading}
        />
      </div>
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
