"use client";

import React from "react";

import useFormBuilder, {
  FormField,
} from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import MapComponent from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";

export default function OrganizationalContactForm() {
  const initialValues = {};

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    formFields,
    onSubmit: () => {},
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Contact details</span>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          {renderFormFields()}
        </div>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <div className="flex gap-5 flex-col">
            <FormInput
              errors={""}
              name=""
              onChange={() => {}}
              label="URL"
              placeHolder="Select Organization"
              value={""}
            />
            <FormInput
              errors={""}
              name=""
              onChange={() => {}}
              label="Service"
              placeHolder="Select Organization"
              value={""}
            />
            <div className="gap-3 flex flex-col">
              <div className="flex gap-2 items-center">
                <span>Logo</span>
              </div>
              <FileUpload />
            </div>
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-primary-danger text-sm">*</span>
              <span>Address</span>
            </div>
            <MapComponent
              center={{ lat: 45, lng: 45 }}
              getLocation={() => {}}
            />
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton title="Submit" type="submit" />
          <CancelButton />
        </div>
      </form>
    </div>
  );
}

const formFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeHolder: "Name",
    required: true,
  },
  {
    name: "phoneNo",
    label: "Phone Number",
    placeHolder: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "preferedContact",
    label: "Prefered Cotnact",
    placeHolder: "Select contact method",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    required: true,
  },
];
