import React from "react";
import { Metadata } from "next";

import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import UsersList from "./components/UsersList";

export const metadata: Metadata = {
  title: "Users",
  description: "",
};

export default function Users() {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader title="Users" />
      <div className="p-5 bg-white shadow">
        <UsersList />
      </div>
    </div>
  );
}
