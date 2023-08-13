import React from "react";
import { LockOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import GoBack from "@/components/buttons/GoBackleanq_support_coordinator";
import { PasswordFormInput } from "@/components/form/FormInputleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

export default function ResetPassword({ changePassword }: any) {
  return (
    <div className="flex flex-col items-left justify-center h-screen w-[360px] gap-5">
      <GoBack route={routes.login} />
      <h2 className="text-4xl mb-2 mt-0">Change Password</h2>
      <div className="flex gap-5 flex-col">
        <PasswordFormInput
          prefix={<LockOutlined className="text-primary-title pr-4" />}
          errors={null}
          placeHolder="Password"
          name="password"
          onChange={() => {}}
          value={null}
        />
        <PasswordFormInput
          prefix={<LockOutlined className="text-primary-title pr-4" />}
          errors={null}
          placeHolder="Confirm Password"
          name="confirmPassword"
          onChange={() => {}}
          value={null}
        />
      </div>
      <div>
        <FlatButton title="Submit" onClick={changePassword} />
      </div>
    </div>
  );
}
