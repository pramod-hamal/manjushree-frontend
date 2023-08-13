import React from "react";
import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import UsersList from "./components/UsersList";

export default function Users() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Users" />
      <div className="bg-white p-5 shadow">
        <UsersList />
      </div>
    </div>
  );
}
