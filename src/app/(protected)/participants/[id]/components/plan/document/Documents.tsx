import React from "react";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";

export default function Documents() {
  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 ">
      <span className="text-lg font-semibold">Documents</span>
      <FileUpload onChange={() => {}} value={null} />
    </div>
  );
}
