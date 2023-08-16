import React from "react";
import Image from "next/image";
import { Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { toogleTaskDrawer } from "@/store/features/projects/projectSliceleanq_support_coordinator";

export default function ProjectDetail() {
  const { selectedProject } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="sticky">
        <h3 className="text-2xl">{selectedProject?.name} </h3>
        <p className="text-sm text-gray-500">{selectedProject?.description} </p>
      </div>
      <Divider />
      <div className="flex items-end justify-between w-full pt-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold">Employee</label>
          <div className="flex gap-2">
            {selectedProject?.employee.map((e: any, index: number) => {
              return (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  alt="asd"
                  className="w-8 h-8 transition-all rounded-full cursor-pointer hover:scale:105 hover:shadow"
                  src={e.image}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold">Participants</label>
          <Image
            width={100}
            height={100}
            alt="asd"
            className="w-8 h-8 transition-all rounded-full cursor-pointer hover:scale:105 hover:shadow"
            src={selectedProject?.participant.image}
          />
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
      <TaskLists tasks={selectedProject?.tasks ?? []} />
    </div>
  );
}

const TaskLists = ({ tasks }: { tasks: any[] }) => {
  return (
    <>
      {tasks.map((task: any, index: number) => {
        return (
          <div
            className="p-3 my-5 transition-all bg-white shadow cursor-pointer hover:shadow-lg hover:scale-105"
            key={index}
          >
            <p className="w-full text-sm font-semibold">{task.title}</p>
            <span className="text-xs text-gray-400">{task.description}</span>
            <div className="flex items-end justify-between w-full pt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold">Employee</label>
                <Image
                  width={100}
                  height={100}
                  alt="asd"
                  className="w-8 h-8 transition-all rounded-full cursor-pointer hover:scale:105 hover:shadow"
                  src={"https://randomuser.me/api/portraits/men/75.jpg"}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
