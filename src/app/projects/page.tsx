"use client";

import React, { useState } from "react";
import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import ProjectsList from "./components/ProjectsList";
import {
  InsertRowAboveOutlined,
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";
import KanbanBoard from "@/components/dnd/DndBoardleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

export type Mode = "table" | "kanban";

export default function ProjectPage() {
  const [mode, setMode] = useState<Mode>("kanban");
  const handleToogle = (viewMode: Mode) => setMode(viewMode);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <PageHeader title="Projects" />
        <span className="flex gap-4">
          <TableOutlined
            onClick={() => handleToogle("table")}
            className={`p-3 ${
              mode === "table" && "bg-white rounded-md shadow"
            }`}
          />
          <InsertRowAboveOutlined
            onClick={() => handleToogle("kanban")}
            className={`p-3 ${
              mode === "kanban" && "bg-white rounded-md shadow"
            }`}
          />
        </span>
      </div>
      <div className="bg-white p-5 shadow">
        <div className="flex items-center justify-between pb-5">
          <div className="w-[360px]">
            <SearchInput placeHolder="Search Existing" />
          </div>
          <FlatButton
            icon={<PlusOutlined />}
            title="Add New"
            onClick={() => {}}
          />
        </div>
        {mode === "kanban" ? <KanbanBoard /> : <ProjectsList />}
      </div>
    </div>
  );
}
