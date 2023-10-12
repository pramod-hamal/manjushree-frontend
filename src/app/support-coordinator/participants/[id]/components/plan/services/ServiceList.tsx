import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import CusDrawer from "@/components/drawer/Drawerleanq_support_coordinator";
import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";

import ServiceForm from "./form/ServiceForm";
import ServiceDetail from "./ServiceDetail";
import useServiceListHook from "./hooks/useServiceListHook";

function ServiceList({ value }: { value: PaginatedTableValue }) {
  const {
    planService: { isLoading, data, isFetching },
    onRowClick, onServiceFormClose, onServiceFormOpen,
    handleDetailDrawerToogle,
    serviceDetail, plan, show, showDetail,
  } = useServiceListHook({ pagination: value })

  if (isLoading) { return <SkeletonTable />; }

  if (plan === null) { return <NoPlanConfiguredError /> }

  const services = data?.data;

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <span className="text-lg font-semibold">Services</span>
        <FlatButton icon={<PlusOutlined />} title="Add Service" onClick={onServiceFormOpen} />
      </div>
      <div>
        <CusTable
          columns={columns}
          onRowClick={onRowClick}
          dataSource={services ?? []}
          loading={isFetching}
        />
      </div>
      <CusDrawer width={"80%"} open={show} title="Add service" handleDrawerToogle={onServiceFormClose}>
        <ServiceForm onClose={onServiceFormClose} />
      </CusDrawer>
      <CusDrawer open={showDetail} handleDrawerToogle={handleDetailDrawerToogle}>
        <ServiceDetail id={serviceDetail?.id} />
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