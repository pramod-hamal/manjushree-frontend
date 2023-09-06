"use client";

import React, { useEffect } from "react";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import ProjectDetailDrawer from "./projectDetail/ProjectDetailDrawer";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  clearSelected,
  projectData,
  selectProject,
  toogleProjectDrawer,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useProjectListQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";
import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";
import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";

function ProjectsList({ value }: { value: PaginatedTableValue }) {
  const { paginationMeta, setPaginationMeta } = value;

  const { showProjectDetailDrawer } = useAppSelector(projectData);
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, error } = useProjectListQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
  });

  useEffect(() => {
    let organizationData = data;
    if (organizationData) {
      if (data?.meta) {
        setPaginationMeta(organizationData?.meta);
      }
    }
  }, [data, setPaginationMeta]);

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="flex flex-col">
      <CusTable
        onRowClick={(row: any) => {
          dispatch(selectProject(row));
          dispatch(toogleProjectDrawer(true));
        }}
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isFetching}
      />
      <ProjectDetailDrawer
        open={showProjectDetailDrawer}
        handleDrawerToogle={() => {
          dispatch(clearSelected());
          dispatch(toogleProjectDrawer(false));
        }}
      />
    </div>
  );
}

export default withPaginatedTable(ProjectsList);

const columns: any = [
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (date: any) => {
      return <span>{defaultDateFormat(date)}</span>;
    },
  },
  { title: "Description", dataIndex: "description" },
];

const getStatusBackground = (status: string): string | undefined => {
  switch (status) {
    case "completed":
      return "bg-status-active";
    case "todo":
      return "bg-status-restricted";
    case "deactivated":
      return "bg-status-deactivated";
    default:
      break;
  }
};
