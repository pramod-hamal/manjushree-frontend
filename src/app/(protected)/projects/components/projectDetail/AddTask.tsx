import React from "react";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput, {
  TextAreaInput,
} from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

export default function AddTask() {
  return (
    <form className="grid grid-cols-1 gap-5">
      <FormInput
        label="Title"
        required={true}
        placeHolder="Enter Title"
        name="title"
        onChange={() => {}}
        errors={""}
        value={""}
      />
      <CusSelect
        options={[]}
        label="Select Employees"
        required={true}
        placeHolder="Select Employee"
        onChange={() => {}}
        errors={""}
        value={""}
      />
      <TextAreaInput
        label="Description"
        placeHolder="Task Description"
        name="title"
        onChange={() => {}}
        errors={""}
        value={""}
      />
      <div>
        <FlatButton title="Submit" type="submit" />
      </div>
    </form>
  );
}
