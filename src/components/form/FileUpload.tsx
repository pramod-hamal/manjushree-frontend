import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";

const { Dragger } = Upload;

export default function FileUpload({
  onChange,
  value,
}: {
  onChange: any;
  value: any;
}) {
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
        <p className="m-0 text-xs ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="m-0 text-xs ant-upload-hint ">
          Support for a single or bulk upload
        </p>
      </div>
    </Dragger>
  );
}
