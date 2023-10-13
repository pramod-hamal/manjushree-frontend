"use client";

import React, { useEffect } from "react";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import useCurrentLocation from "@/core/hooks/currentLocation/useCurrentLocationleanq_support_coordinator";

import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import MapComponent, {
  LatLng,
  getNameByLatLang,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import { IndividualContactFormProps } from "../add/interface/add-individual.interface";
import {
  Address,
} from "../interface/contact.interface";
import { TextAreaInput } from "@/components/form/FormInputleanq_support_coordinator";
import ErrorMessage from "@/components/form/ErrorMessageleanq_support_coordinator";
import useAddIndividualContactHook from "../hook/useAddIndividualContactHook";

export default function IndividualContactForm({
  editMode,
  values,
}: IndividualContactFormProps) {
  const showToast = useToast();
  const { location, error } = useCurrentLocation();

  const { formik, renderFormFields, organizationContact } = useAddIndividualContactHook({ editMode: editMode })

  useEffect(() => {
    if (editMode === true && values !== null) {
      formik.setValues({
        ...values, address: {
          ...values.address,
          latitude: values.address.latitude ? Number(values.address.latitude) : location.lat,
          longitude: values.address.longitude ? Number(values.address.longitude) : location.lng,
        }
      });
    }
  }, [editMode, values]);

  useEffect(() => {
    if (error && error.message) { showToast({ title: error.message, type: "error" }) }
  }, [error])

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Contact details</span>
      <form className="flex flex-col gap-5" >
        <div className="grid grid-cols-2 gap-5 gap-x-10"> {renderFormFields()}</div>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <div className="flex gap-5 flex-col">
            <CusSelect
              onChange={(selectedData: any) => {
                formik.setFieldValue("organizationId", selectedData);
              }}
              label="Select Organization"
              placeHolder="Select Organization"
              options={organizationContact?.data ?? []}
              value={formik.values?.organizationId}
            />
            <CusSelect
              onChange={(selectedValue: any) =>
                formik.setFieldValue("preferredContactMethod", selectedValue)
              }
              errors={formik.errors?.preferredContactMethod}
              required={true}
              label="Prefered Contact Method"
              placeHolder="Select Prefered Contact"
              options={[
                { label: "Email", value: "email" },
                { label: "Phone", value: "phone" },
              ]}
              value={formik.values.preferredContactMethod}
            />
            <TextAreaInput
              className="h-[100px]"
              label="Note"
              errors={formik.errors?.note}
              name="note"
              onChange={formik.handleChange}
              value={formik.values?.note} />
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-2 items-center"><span className="text-primary-danger text-sm">*</span><span>Address</span>
            </div>
            <MapComponent
              center={editMode ? { lat: formik.values?.address?.latitude, lng: formik.values?.address?.longitude } : location}
              getLocation={async (position: LatLng) => {
                const place = await getNameByLatLang(position);
                const address: Address = {
                  latitude: position.lat,
                  longitude: position.lng,
                  name: place,
                };
                formik.setFieldValue("address", address);
              }}
            />
            {formik.errors?.address && <ErrorMessage message={formik.errors?.address.toString()} />}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton
            onClick={formik.handleSubmit}
            title={editMode === true ? "Edit" : "Submit"}
            type="button"
            loading={formik.isSubmitting}
          />
          <CancelButton />
        </div>
      </form>
    </div>
  );
}
