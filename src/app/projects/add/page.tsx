import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import React from "react";
import AddProjectForm from "./components/AddProjectForm";

export default function AddProjectPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Create Project" />
      <div className="bg-white p-5 shadow">
        <AddProjectForm />
      </div>
    </div>
  );
}
