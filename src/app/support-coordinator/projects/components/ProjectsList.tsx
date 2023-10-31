"use client";

import React from "react";
import moment from "moment";

import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";
import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";

import {
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  projectData,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";

import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import ProjectDetailDrawer from "./projectDetail/ProjectDetailDrawer";
import useGetProjectList from "../hook/useGetProjectList";

function ProjectsList({ value, searchText }: { value: PaginatedTableValue, searchText: string }) {

  const { showProjectDetailDrawer } = useAppSelector(projectData);

  const { isLoading, isFetching, data, onRowClick, handleDrawerToogle } = useGetProjectList(value, searchText)

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="flex flex-col">
      <CusTable
        onRowClick={onRowClick}
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isFetching}
      />
      <ProjectDetailDrawer
        open={showProjectDetailDrawer}
        handleDrawerToogle={handleDrawerToogle}
      />
    </div>
  );
}

export default withPaginatedTable(ProjectsList);

const columns: any = [
  {
    title: "Due Date",
    dataIndex: "date",
    sorter: (a: any, b: any) => moment(a.date).unix() - moment(b.date).unix(),
    render: (date: any) => {
      return <span>{defaultDateFormat(date)}</span>;
    },
    width: 150
  },
  {
    title: "Name",
    dataIndex: "title",
    render: (title: string) => <p className="truncate">{title}</p>
  },
  { title: "Description", dataIndex: "description" },
];