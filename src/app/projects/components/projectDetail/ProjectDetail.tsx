import React from "react";
import Image from "next/image";
import { Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

export default function ProjectDetail() {
  return (
    <div>
      <div className="sticky">
        <h3 className="text-2xl">
          Personal Information - Update info does not work and displays an error
        </h3>
        <p className="text-gray-500 text-sm">
          The individual appears to be in good overall health. They have a
          normal body mass index (BMI) and no known chronic medical conditions.
          They engage in regular exercise and follow a balanced diet. They
          report no significant symptoms such as pain, fatigue, or difficulty
          breathing.
        </p>
      </div>
      <Divider />
      <div className="flex items-end justify-between w-full pt-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold">Employee</label>
          <Image
            width={100}
            height={100}
            alt="asd"
            className="hover:scale:105 transition-all hover:shadow cursor-pointer rounded-full w-8 h-8"
            src={"https://randomuser.me/api/portraits/men/75.jpg"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold">Participants</label>
          <Image
            width={100}
            height={100}
            alt="asd"
            className="hover:scale:105 transition-all hover:shadow cursor-pointer rounded-full w-8 h-8"
            src={"https://randomuser.me/api/portraits/men/75.jpg"}
          />
        </div>
      </div>
      <Divider />
      <div className="flex justify-between">
        <h3 className="text-xl m-0">Tasks </h3>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Task"
          onClick={() => {}}
          color="text-black bg-white border border-solid text-xs shadow border-[#1890FF] text-primary-title"
        />
      </div>
      <TaskLists tasks={[1, 11, 1, 1, 1, 1, 1, 1, 1]} />
    </div>
  );
}

const TaskLists = ({ tasks }: { tasks: any[] }) => {
  return (
    <>
      {tasks.map((task: any, index: number) => {
        return (
          <div
            className="bg-white transition-all shadow p-3 my-5 hover:shadow-lg cursor-pointer hover:scale-105"
            key={index}
          >
            <p className="w-full text-sm font-semibold">Personal Information</p>
            <span className="text-xs text-gray-400">
              Update info does nit work and displays an error personal
              information - update info does not work and displays an error
            </span>
            <div className="flex items-end justify-between w-full pt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold">Employee</label>
                <Image
                  width={100}
                  height={100}
                  alt="asd"
                  className="hover:scale:105 transition-all hover:shadow cursor-pointer rounded-full w-8 h-8"
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
