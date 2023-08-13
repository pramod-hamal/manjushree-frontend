import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import React from "react";

export default function UserRoles() {
  return (
    <div className="p-5 bg-white flex flex-col gap-5">
      <span className="text-2xl font-semibold">Role</span>
      <div className="grid grid-cols-3">
        <CusSelect
          label="User Role"
          placeHolder="Select Role"
          value={"User"}
          onChange={() => {}}
          options={[{ label: "User", value: "User" }]}
        />
      </div>
    </div>
  );
}
