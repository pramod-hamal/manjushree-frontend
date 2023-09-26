"use client";

import React, { useEffect } from "react";
import moment from "moment";


import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";
import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";

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


import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import ProjectDetailDrawer from "./projectDetail/ProjectDetailDrawer";

function ProjectsList({ value, searchText }: { value: PaginatedTableValue, searchText: string }) {
  const { paginationMeta, setPaginationMeta } = value;

  const { showProjectDetailDrawer, selectedProject } = useAppSelector(projectData);
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, error } = useProjectListQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
    searchText
  });

  useEffect(() => {
    if (data && data?.meta) {
      setPaginationMeta(data?.meta);
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