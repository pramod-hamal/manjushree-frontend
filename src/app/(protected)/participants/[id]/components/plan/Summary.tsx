import React from "react";
import { Skeleton } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import {
  ParticipantDetailSlice,
  participantDetailState,
} from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  PlanInterface,
  PlanResponse,
} from "@/store/features/participants/plan/interface/plan.responseleanq_support_coordinator";
import {
  daysDifference,
  defaultDateFormat,
} from "@/lib/date.utilsleanq_support_coordinator";
import { useParticipantPlanQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

export default function Summary() {
  const { participantDetail }: ParticipantDetailSlice = useAppSelector(
    participantDetailState
  );

  const { data, error, isLoading } = useParticipantPlanQuery(
    participantDetail?.id!
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded p-5 flex flex-col gap-5">
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return <p>error</p>;
  }

  const planData: PlanResponse | undefined = data?.data;
  const plan: PlanInterface | null =
    planData && planData.length > 0 ? planData[0] : null;

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5">
      <span className="text-lg font-semibold">Plan Summary</span>
      <div className="flex flex-col gap-5">
        <span className="text-xs text-gray-400">Current Plan</span>
        {plan !== null ? (
          <>
            <div className="flex items-center gap-5 justify-between">
              <span className="font-semibold text-sm">
                {defaultDateFormat(plan.startDate)} -
                {defaultDateFormat(plan.endDate)}
              </span>
              <span>
                <EyeOutlined className="text-primary-title mr-5" />
              </span>{" "}
            </div>
            <span className="text-xs text-gray-400">Days Remaining</span>
            <div className="flex items-center gap-5 font-semibold justify-between">
              <span className="font-semibold text-sm">
                {daysDifference(
                  defaultDateFormat(plan.startDate),
                  defaultDateFormat(plan.endDate)
                )}
              </span>
              <span>
                <EyeOutlined className="text-primary-title mr-5" />
              </span>{" "}
            </div>
          </>
        ) : (
          <div>
            <FlatButton
              title="Create Plan"
              onClick={() => {}}
              icon={<PlusOutlined />}
            />
          </div>
        )}
      </div>
    </div>
  );
}
