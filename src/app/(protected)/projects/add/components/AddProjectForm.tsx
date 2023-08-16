"use client";

import React from "react";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput, {
  TextAreaInput,
} from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

export default function AddProjectForm() {
  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Project details</span>
      <form className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            name=""
            label="Title"
            required={true}
            onChange={() => {}}
            errors={""}
            value={""}
          />
          <CusSelect
            options={[]}
            placeHolder="Select Service"
            label="Selecct Service"
            onChange={() => {}}
            required={true}
            value={""}
            errors={""}
          />
          <CusSelect
            options={[]}
            placeHolder="Select Participants"
            label="Add Participant"
            onChange={() => {}}
            required={true}
            value={""}
            errors={""}
          />
          <FormInput
            name=""
            type="date"
            label="Title"
            required={true}
            onChange={() => {}}
            errors={""}
            value={""}
          />
          <div>
            <CusSelect
              options={[]}
              placeHolder="Select Participants"
              label="Add Participant"
              onChange={() => {}}
              required={true}
              value={""}
              errors={""}
            />
          </div>
          <TextAreaInput
            name=""
            placeHolder="Description Here"
            label="Description"
            required={true}
            onChange={() => {}}
            errors={""}
            value={""}
          />
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton title="Submit" type="submit" />
          <CancelButton onClick={() => {}} />
        </div>
      </form>
    </div>
  );
}
