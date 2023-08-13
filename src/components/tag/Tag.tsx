import React from "react";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";

export interface TagProps {
  title: string;
  onEdit: any;
  onDelete: any;
}

export default function Tag({ title, onEdit, onDelete }: TagProps) {
  return (
    <div className="bg-primary-searchbar p-2 flex gap-3 items-center">
      <span>{title}</span>
      <EditOutlined
        className="text-primary-button hover:scale-105"
        onClick={onEdit}
      />
      <CloseCircleOutlined
        onClick={onDelete}
        className="text-primary-danger hover:scale-105"
      />
    </div>
  );
}
