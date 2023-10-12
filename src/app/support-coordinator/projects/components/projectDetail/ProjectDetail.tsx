import React from "react";
import { Avatar, Divider, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { getNamefirstChar } from "@/core/lib/getFristChar.utilleanq_support_coordinator";

import {
  useAppDispatch,
} from "@/store/hooksleanq_support_coordinator";
import { useGetAllTaskByProjectIdQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import { toogleTaskDrawer } from "@/store/features/projects/projectSliceleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CopyTextIcon from "@/components/icons/CopyTextIconleanq_support_coordinator";

export default function ProjectDetail({ data }: any) {
  const dispatch = useAppDispatch();

  const { data: taskData, isLoading, error } = useGetAllTaskByProjectIdQuery(data.id);

  return (
    <div>
      <div className="sticky">
        <div className="flex items-center gap-5">
          <h3 className="text-2xl">{data?.title} </h3>
          <CopyTextIcon val={data?.title} />
        </div>
        <div className="flex items-center gap-5">
          <p className="text-sm text-gray-500">{data?.description} </p>
          <CopyTextIcon val={data?.description} />
        </div>
      </div>
      <Divider />
      <div className="flex items-end justify-between w-full pt-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold">Participants</label>
          <Tooltip title={`${data?.participant?.firstName} ${data?.participant?.middleName ?? ""} ${data?.participant?.lastName ?? ""}`} trigger="hover">
            <Avatar style={{ backgroundColor: '#1677ff' }}>
              {getNamefirstChar(data?.participant?.firstName)}{getNamefirstChar(data?.participant?.lastName)}</Avatar>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold">Employee</label>
          <div className="flex gap-2">
            {data?.supportCoordinators?.map((e: any, index: number) => {
              return (
                <Tooltip key={index} title={`${e.firstName} ${e?.middleName ?? ""} ${e.lastName}`} trigger="hover">
                  <Avatar key={index} style={{ backgroundColor: '#87d068' }}> {getNamefirstChar(e.firstName)}{getNamefirstChar(e.lastName)}</Avatar>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between">
        <h3 className="m-0 text-xl">Tasks </h3>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Task"
          onClick={() => {
            dispatch(toogleTaskDrawer(true));
          }}
          color="text-black bg-white border border-solid text-xs shadow border-[#1890FF] text-primary-title"
        />
      </div>
      <TaskLists tasks={taskData ?? []} />
    </div>
  );
}

const TaskLists = ({ tasks }: { tasks: any[] }) => {
  return tasks.map((task: any, index: number) => {
    return (
      <div
        className="p-3 my-5 transition-all bg-white shadow cursor-pointer hover:shadow-lg"
        key={index}
      >
        <p className="w-full text-sm font-semibold">{task.title}</p>
        <span className="text-xs text-gray-400">{task.description}</span>
        <div className="flex items-center gap-4  w-full pt-2">
          <div className="flex flex-col gap-2"><label className="text-xs font-semibold">Employee</label></div>
          <Tooltip title={`${task?.supportCoordinator?.firstName} ${task?.supportCoordinator?.middleName ?? ""} ${task?.supportCoordinator?.lastName ?? ""}`} trigger="hover">
            <Avatar style={{ backgroundColor: '#1677ff' }}>
              {getNamefirstChar(task?.supportCoordinator?.firstName)}{getNamefirstChar(task?.supportCoordinator?.lastName)}</Avatar>
          </Tooltip>
        </div>
      </div>
    );
  })
}
