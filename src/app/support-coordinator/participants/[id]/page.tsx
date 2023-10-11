"use client";

import React from "react";
import { Skeleton } from "antd";

import { useGetUserByIdQuery } from "@/store/features/participants/detail/apiSliceleanq_support_coordinator";

import CusTabs from "@/components/tabs/Tabsleanq_support_coordinator";

import ProfileHeader from "./components/ProfileHeader";
import { items } from "./tab.items";

export default function ParticipantDetail({
  params,
}: {
  params: { id: string };
}) {
  const { isLoading, error }: any = useGetUserByIdQuery(params.id);

  return (
    <div className="relative">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <ProfileHeader />
          <div className="py-5" />

          <CusTabs items={items} type="line" onTabClick={() => { }} />
        </>
      )}
    </div>
  );
}
