"use client";
import React from "react";
import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import IndividualContactForm from "../add/components/IndividualContactForm";
import { useGetContactbyIdQuery } from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { Skeleton } from "antd";

export default function EditIndividualContactPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, error } = useGetContactbyIdQuery(params.id);

  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Edit Individual Contact" />
      <div className="bg-white p-5 shadow">
        {isLoading ? (
          <Skeleton />
        ) : (
          <IndividualContactForm editMode={true} values={data?.data} />
        )}
      </div>
    </div>
  );
}
