import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  onChange(info: UploadChangeParam<UploadFile<any>>) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function FileUpload() {
  return (
    <Dragger {...props}>
      <div className="flex flex-col ">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text text-xs m-0">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint text-xs m-0 ">
          Support for a single or bulk upload
        </p>
      </div>
    </Dragger>
  );
}
