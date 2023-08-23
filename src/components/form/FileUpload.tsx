import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import Image from "next/image";

const { Dragger } = Upload;

export default function FileUpload({ onChange }: { onChange: any }) {
  return (
    <Dragger
      multiple={false}
      onChange={(fileList: any) => {
        onChange(fileList);
      }}
      beforeUpload={() => false} // Prevent automatic upload
    >
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
