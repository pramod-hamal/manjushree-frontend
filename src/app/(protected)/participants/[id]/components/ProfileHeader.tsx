"use client";

import React from "react";
import Image from "next/image";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import {
  ParticipantDetail,
} from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";

import useGetParticipantDetail from "../hook/useGetParticipant";
import useGetParticipantPlan, { GetParticipantPlanProps } from "../hook/useGetParticipantPlan";

export default function ProfileHeader() {
  const participant: ParticipantDetail | null = useGetParticipantDetail();

  const { plan, error, isLoading }: GetParticipantPlanProps = useGetParticipantPlan(
    { id: participant?.id! }
  );
  return (
    <div className="flex items center justify-between">
      <div className="flex gap-10 items-center">
        <Image
          width={72}
          height={72}
          src="https://th.bing.com/th/id/OIP.UjVwVWru6osVUXBx27mCMAHaHa?pid=ImgDet&rs=1"
          alt="Profile"
        />
        <div className="flex flex-col">
          <span className="text-lg flex font-semibold gap-2">
            <span> {participant?.firstName}</span>
            <span> {participant?.middleName}</span>
            <span> {participant?.lastName}</span>
          </span>
          <span className="text-gray-400 text-sm">Primary Diagnosis</span>
        </div>
      </div>
      <div className="flex gap-x-10">
        <FormInput
          name=""
          errors={null}
          onChange={() => { }}
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
          {plan !== null ? <div className="flex items-center gap-5">
            <span className="">
              {plan && defaultDateFormat(plan?.startDate)} -
              {plan && defaultDateFormat(plan?.endDate)}
            </span>
            <span>
              <EyeOutlined className="text-primary-title mr-5" />
            </span>
          </div> : <>Plan not configured</>}
        </div>
      </div>
    </div>
  );
}
