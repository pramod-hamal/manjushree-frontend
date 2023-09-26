import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import HealthConditionForm from "./HealthConditionForm";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useGetParticipantHealthListQuery } from "@/store/features/participants/health/apiSliceleanq_support_coordinator";
import {
  PartticipantHealthSlice,
  participantHealthState,
  toogleModal,
} from "@/store/features/participants/health/participantHealthSliceleanq_support_coordinator";

export default function HealthList() {
  const { participantDetail } = useAppSelector(participantDetailState);
  const dispatch = useAppDispatch();
  const { healthList, paginationMeta, showModal }: PartticipantHealthSlice =
    useAppSelector(participantHealthState);

  const { isLoading, error } = useGetParticipantHealthListQuery(
    participantDetail?.id
  );
  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex flex-row-reverse">
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Marks"
          onClick={() => dispatch(toogleModal(true))}
        />
      </div>
      <div>
        <CusTable
          columns={columns}
          onRowClick={() => { }}
          paginationMeta={paginationMeta}
          dataSource={healthList}
          loading={isLoading}
        />
      </div>
      <CusModal
        show={showModal}
        onClose={() => {
          dispatch(toogleModal(false));
        }}
      >
        <HealthConditionForm />
      </CusModal>
    </div>
  );
}

const columns: any[] = [
  { title: "Title", dataIndex: "title", width: 250 },
  { title: "Description", dataIndex: "description" },
  { title: "Type", dataIndex: "type", width: 200 },
];
