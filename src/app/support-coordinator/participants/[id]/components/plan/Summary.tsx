import React, { useState } from "react";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  daysDifference,
  defaultDateFormat,
} from "@/core/lib/date.utilsleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import CopyTextIcon from "@/components/icons/CopyTextIconleanq_support_coordinator";

import useGetParticipantPlan, { GetParticipantPlanProps } from "../../hook/useGetParticipantPlan";
import useGetParticipantDetail from "../../hook/useGetParticipant";

import CreatePlan from "./CreatePlanForm";

export default function Summary() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const participant = useGetParticipantDetail();
  const { plan, error, isLoading }: GetParticipantPlanProps = useGetParticipantPlan(
    { id: participant?.id! }
  );

  if (isLoading) {
    return (<div className="bg-white rounded p-5 flex flex-col gap-5">  <Skeleton /></div>);
  }

  if (error) { return <p>error</p> }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <span className="text-lg font-semibold">Plan Summary</span>
        {plan !== null && <span>
          <CopyTextIcon val={
            `Plan period is ${defaultDateFormat(plan.startDate)} to ${defaultDateFormat(plan.endDate)} and ${daysDifference(defaultDateFormat(plan.startDate), defaultDateFormat(plan.endDate))}
             days is remaining for tis plan.`
          } />
        </span>}
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-xs text-gray-400">Current Plan</span>
        {plan !== null ? (
          <>
            <div className="flex items-center gap-5 justify-between">
              <span className="font-semibold text-sm">{defaultDateFormat(plan.startDate)} -{defaultDateFormat(plan.endDate)}</span>
            </div>
            <span className="text-xs text-gray-400">Days Remaining</span>
            <div className="flex items-center gap-5 font-semibold justify-between">
              <span className="font-semibold text-sm">
                {daysDifference(defaultDateFormat(plan.startDate), defaultDateFormat(plan.endDate))}
              </span>
            </div>
          </>
        ) : (
          <div>
            <FlatButton
              title="Create Plan"
              onClick={() => setShowModal(true)}
              icon={<PlusOutlined />}
            />
          </div>
        )}
      </div>
      <CusModal show={showModal} onClose={() => setShowModal(false)}>
        <CreatePlan onClose={() => setShowModal(false)} />
      </CusModal>
    </div >
  );
}

