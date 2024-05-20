import { Metadata } from "next";

import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import ClassList from "./components/ClassList";

export const metadata: Metadata = {
  title: "Class",
  description: "",
};

export default function Users() {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader title="Classes" />
      <div className="p-5 bg-white shadow">
        <ClassList />
      </div>
    </div>
  );
}
