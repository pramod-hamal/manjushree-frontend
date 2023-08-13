import React from "react";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import { UserOutlined } from "@ant-design/icons";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { routes } from "@/constants/routesleanq_support_coordinator";
import GoBack from "@/components/buttons/GoBackleanq_support_coordinator";

export default function ValidateEmail({ validateEmail }: any) {
  return (
    <div className="flex flex-col items-left justify-center h-screen w-[360px] gap-5">
      <GoBack route={routes.login} />
      <h2 className="text-4xl mb-2 mt-0">Enter Email</h2>
      <FormInput
        prefix={<UserOutlined className="text-primary-title pr-4" />}
        name=""
        placeHolder="Enter email"
        onChange={() => {}}
        errors={null}
        value={""}
      />
      <div>
        <FlatButton title="Submit" onClick={validateEmail} />
      </div>
    </div>
  );
}
