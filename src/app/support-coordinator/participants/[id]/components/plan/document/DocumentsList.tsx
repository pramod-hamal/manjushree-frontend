import React, { useState } from "react";
import { FileImageFilled, PlusOutlined } from "@ant-design/icons";

import Documents from "./Documents";
import {
  useGetAllDocumentsQuery,
  useParticipantPlanQuery,
} from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  PlanInterface,
  PlanResponse,
} from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";
import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";

export default function DocumentsList() {
  const { participantDetail } = useAppSelector(participantDetailState);
  const { data: userPlan } = useParticipantPlanQuery(participantDetail?.id!);

  const planData: PlanResponse | undefined = userPlan?.data;
  const plan: PlanInterface | null =
    planData && planData.length > 0 ? planData[0] : null;

  const { data, isLoading, isFetching, error } = useGetAllDocumentsQuery({
    plan: plan?.id!,
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 ">
      <div className="flex justify-between items-center w-full">
        <span className="text-lg font-semibold m-0 pb-5">Plan Documents</span>
        <div>
          <FlatButton
            title="Add New"
            icon={<PlusOutlined />}
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <div className="flex gap-5 overflow-auto pb-5 px-3">
        {data?.data.length === 0 ? (
          <div className="text-center">No Documents</div>
        ) : (
          data?.data.map((document: any, index: number) => {
            return (
              <a
                className="w-[200px] text-gray-600 hover:scale-105 transition-all hover:text-black hover:shadow"
                key={index}
                download={true}
                target="_blank"
                href={document?.document.path}
              >
                <div className="flex flex-col hover:shadow-lg cursor-pointer p-3 text-center gap-3 border-1 rounded-xl">
                  <FileImageFilled className="text-primary-button text-4xl" />
                  <span className="text-xs truncate">
                    {document?.document.metaData.fileName}
                  </span>
                  <span className="text-xs font-bold truncate">
                    {document?.document.metaData.mimetype}
                  </span>
                </div>
              </a>
            );
          })
        )}
      </div>
      <CusModal show={showModal} onClose={() => setShowModal(false)}>
        <Documents onClose={() => setShowModal(false)} />
      </CusModal>
    </div>
  );
}
