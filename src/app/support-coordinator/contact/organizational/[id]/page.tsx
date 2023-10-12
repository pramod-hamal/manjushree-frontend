"use client";

import React from "react";
import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";

import OrganizationalContactForm from "../components/OrganizationalContactForm";
import { useGetContactbyIdQuery } from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { Skeleton } from "antd";

export default function EditOrganizationalPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, error } = useGetContactbyIdQuery(params.id);
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Edit Organizational Contact" />
      <div className="bg-white p-5 shadow">
        {isLoading ? (
          <Skeleton />
        ) : (
          <OrganizationalContactForm editMode={true} value={data?.data} />
        )}
      </div>
    </div>
  );
}
