import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

import { useGetPlanServicesQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import CusDrawer from "@/components/drawer/Drawerleanq_support_coordinator";
import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";

import ServiceForm from "./form/ServiceForm";
import useGetParticipantPlan, { GetParticipantPlanProps } from "../../../hook/useGetParticipantPlan";
import useGetParticipantDetail from "../../../hook/useGetParticipant";
import ServiceDetail from "./ServiceDetail";

function ServiceList({ value }: { value: PaginatedTableValue }) {
  const { paginationMeta, setPaginationMeta } = value;

  const [show, setShow] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [serviceDetail, setServiceDetail] = useState<any|null>(null)

  const participant = useGetParticipantDetail();
  const { plan }: GetParticipantPlanProps = useGetParticipantPlan(
    { id: participant?.id! }
  );

  const { data, isLoading, isFetching } = useGetPlanServicesQuery({ limit: paginationMeta.limit, page: paginationMeta.page ?? 1, });

  useEffect(() => {
    if (data && data?.meta) {
      setPaginationMeta(data?.meta);
    }
  }, [data, setPaginationMeta]);

  if (isLoading) { return <SkeletonTable />; }

  if (plan === null) { return <NoPlanConfiguredError /> }

  const services = data?.data;

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <span className="text-lg font-semibold">Services</span>
        <FlatButton icon={<PlusOutlined />} title="Add Service" onClick={() => setShow(true)} />
      </div>
      <div>
        <CusTable
          columns={columns}
          onRowClick={(rowData: any) => { setShowDetail(true); setServiceDetail(rowData) }}
          dataSource={services ?? []}
          loading={isFetching}
        />
      </div>
      <CusDrawer open={show} handleDrawerToogle={() => setShow(false)}>
        <ServiceForm onClose={() => setShow(false)} />
      </CusDrawer>

      <CusDrawer open={showDetail} handleDrawerToogle={() => {
        setShowDetail(false);
        setServiceDetail(null);
      }}>
        <ServiceDetail id={serviceDetail?.id}/>
      </CusDrawer>
    </div>
  );
}

const columns: any[] = [
  { title: "Service Name", dataIndex: "name" },
  {
    title: "Service Coordinator",
    dataIndex: "serviceCoordinator",
    render: (serviceCoordinator: any) => {
      return (
        <span className="flex  gap-2">
          <span> {serviceCoordinator?.firstName}</span>
          {serviceCoordinator?.middleName && (
            <span> {serviceCoordinator?.middleName}</span>
          )}
          <span> {serviceCoordinator?.lastName}</span>
        </span>
      );
    },
  },
  { title: "Budget", dataIndex: "budget" },
  { title: "Management Type", dataIndex: "managementType" },
];

export default withPaginatedTable(ServiceList);

export const NoPlanConfiguredError = () => <div className="flex flex-col bg-white gap-5 p-5">
  <div className="flex justify-between">
    <span className="text-lg font-semibold">Services</span>
  </div>
  <div>
    <p>Add Plan First</p>
  </div>
</div>