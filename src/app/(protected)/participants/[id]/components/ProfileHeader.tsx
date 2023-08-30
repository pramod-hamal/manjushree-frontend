"use client";

import React from "react";
import Image from "next/image";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";

import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import {
  ParticipantDetailSlice,
  participantDetailState,
} from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useParticipantPlanQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";
import {
  PlanInterface,
  PlanResponse,
} from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";

export default function ProfileHeader() {
  const { participantDetail }: ParticipantDetailSlice = useAppSelector(
    participantDetailState
  );

  const { data } = useParticipantPlanQuery(participantDetail?.id!);

  const planData: undefined | PlanResponse = data?.data;
  const plan: PlanInterface | null =
    planData && planData.length > 0 ? planData[0] : null;

  return (
    <div className="flex items center justify-between">
      <div className="flex gap-10 items-center">
        <Image
          width={72}
          height={72}
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt="Profile"
        />
        <div className="flex flex-col">
          <span className="text-lg flex font-semibold gap-2">
            <span> {participantDetail?.firstName}</span>
            <span> {participantDetail?.middleName}</span>
            <span> {participantDetail?.lastName}</span>
          </span>
          <span className="text-gray-400 text-sm">Primary Diagnosis</span>
        </div>
      </div>
      <div className="flex gap-x-10">
        <FormInput
          name=""
          errors={null}
          onChange={() => {}}
          value={""}
          disabled={true}
          placeHolder="John Wick"
          suffix={<EditOutlined className="text-primary-title" />}
          label="Primary Coordinator"
        />
        <div className="flex text-sm flex-col gap-4">
          <div className="flex gap-2 items-center">
            <span className="">Current Plan</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="">
              {plan && defaultDateFormat(plan?.startDate)} -
              {plan && defaultDateFormat(plan?.endDate)}
            </span>
            <span>
              <EyeOutlined className="text-primary-title mr-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
