"use client";

import React from "react";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import MapComponent, {
  LatLng,
  getNameByLatLang,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import ErrorMessage from "@/components/form/ErrorMessageleanq_support_coordinator";

import { organizationalType } from "@/constants/data/organizationlServiceTypeleanq_support_coordinator";

import {
  OrganizationContactFormProps,
} from "../add/interface/add-organization.interface";
import { Address } from "../../individual/interface/contact.interface";
import useAddUpdateOrganizationalContactForm from "../hook/useAddUpdateOrganizationContactForm";

export default function OrganizationalContactForm({
  editMode,
  value,
}: OrganizationContactFormProps) {

  const { formik, renderFormFields, location } = useAddUpdateOrganizationalContactForm({ editMode, value });

  const handleGeoLocation = async (position: LatLng) => {
    const place = await getNameByLatLang(position);
    const address: Address = {
      latitude: position.lat,
      longitude: position.lng,
      name: place,
    };
    formik.setFieldValue("address", address);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Contact details</span>
      <form className="flex flex-col gap-5" >
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          {renderFormFields()}
        </div>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <div className="flex gap-5 flex-col">
            <FormInput
              errors={formik.errors?.url}
              name="url"
              onChange={formik.handleChange}
              label="URL"
              placeHolder="URL"
              value={formik.values?.url}
            />
            <CusSelect
              errors={formik.errors?.occupationService}
              options={organizationalType}
              onChange={(selectedData: any) => { formik.setFieldValue("occupationService", selectedData) }}
              label="Service"
              placeHolder="Service"
              value={formik.values?.occupationService}
            />
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-primary-danger text-sm">*</span>
              <span>Address</span>
            </div>
            <MapComponent
              center={editMode ? { lat: formik.values?.address?.latitude, lng: formik.values?.address?.longitude } : location}
              getLocation={handleGeoLocation} />
            {formik.errors?.address && <ErrorMessage message={formik.errors?.address.toString()} />}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton
            title={editMode ? "Edit" : "Submit"}
            type="button"
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
          <CancelButton />
        </div>
      </form>
    </div>
  );
}
