"use client";

import React from "react";

import useFormBuilder, {
  FormField,
} from "@/hooks/useFormBuilderleanq_support_coordinator";
import useCurrentLocation from "@/hooks/useCurrentLocationleanq_support_coordinator";

import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import { TextAreaInput } from "@/components/form/FormInputleanq_support_coordinator";
import MapComponent, {
  LatLng,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

export default function IndividualContactForm() {
  const { location, error } = useCurrentLocation();

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
            <CusSelect
              onChange={() => {}}
              label="Select Organization"
              placeHolder="Select Organization"
              options={[]}
              value={""}
            />
            <CusSelect
              onChange={() => {}}
              required={true}
              label="Prefered Contact"
              placeHolder="Select Prefered Contact"
              options={[]}
              value={""}
            />
            <TextAreaInput
              label="Note"
              errors={""}
              name=""
              placeHolder="Notes Here"
              onChange={() => {}}
              value={""}
            />
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-primary-danger text-sm">*</span>
              <span>Address</span>
            </div>
            <MapComponent
              center={location}
              getLocation={(position: LatLng) => {}}
            />
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton title="Submit" type="submit" />
          <FlatButton
            title="Cancel"
            onClick={() => {}}
            color="text-black bg-white  border-1 border-gray-100"
          />
        </div>
      </form>
    </div>
  );
}

const formFields: FormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeHolder: "First name",
    required: true,
  },
  {
    name: "middleName",
    label: "Middle Name",
    placeHolder: "Middle Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeHolder: "Last Name",
    type: "text",
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
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    required: true,
  },
  {
    name: "occupation",
    label: "Occupation",
    placeHolder: "Occupation",
    type: "text",
    required: true,
  },
];
