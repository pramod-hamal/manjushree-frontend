"use client";

import React, { useEffect } from "react";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import useCurrentLocation from "@/core/hooks/currentLocation/useCurrentLocationleanq_support_coordinator";

import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import MapComponent, {
  LatLng,
  getNameByLatLang,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import {
  useAddIndividualContactMutation,
  useUpdateIndividualContactMutation,
} from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

import { IndividualContactFormProps } from "../interface/add-individual.interface";
import { initialValues, formFields, validationSchema } from "../form-utils";
import {
  AddIndividualContactDTO,
  Address,
} from "../../interface/contact.interface";
import { useOrganizationContactQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";

export default function IndividualContactForm({
  editMode,
  values,
  handleOnClose
}: IndividualContactFormProps) {
  const router = useRouter();
  const showToast = useToast();
  const { location, error } = useCurrentLocation();
  const [addContact] = useAddIndividualContactMutation();
  const [updateContact] = useUpdateIndividualContactMutation();
  const { data, isLoading }: any = useOrganizationContactQuery("");

  const handleAddContact = async (
    values: AddIndividualContactDTO,
    { setSubmitting }: FormikHelpers<AddIndividualContactDTO>
  ) => {
    try {
      const { data, error }: any = await addContact(values);
      if (data) {
        formik.resetForm();
        showToast({ title: "Contact Created Successfully", type: "success" });
        handleOnClose !== null ? handleOnClose() : router.replace(routes.individualContact)
      } else {
        const errorData: APIBaseResponse<any> = error.data;
        formik.setErrors(errorData.error)
      }
    } catch (error: any) {
      showToast({ title: error?.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditContact = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    try {
      const { data, error }: any = await updateContact(values);
      if (data) {
        showToast({ title: "Contact Updated Successfully", type: "success" });
        router.replace(routes.individualContact);
      } else {
        const errorData: APIBaseResponse<any> = error.data;
        formik.setErrors(errorData.error)
        showToast({ title: errorData.data?.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    validationSchema,
    formFields,
    onSubmit: editMode === true ? handleEditContact : handleAddContact,
  });

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
    if (error && error.message) {
      showToast({ title: error.message, type: "error" })
    }
  }, [error])

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Contact details</span>
      <form className="flex flex-col gap-5" >
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          {renderFormFields()}
        </div>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <div className="flex gap-5 flex-col">
            <CusSelect
              onChange={(selectedData: any) => {
                formik.setFieldValue("organizationId", selectedData);
              }}
              label="Select Organization"
              placeHolder="Select Organization"
              options={data?.data ?? []}
              value={formik.values?.organizationId}
            />
            <CusSelect
              onChange={(selectedValue: any) =>
                formik.setFieldValue("preferredContactMethod", selectedValue)
              }
              errors={formik.errors?.preferredContactMethod}
              required={true}
              label="Prefered Contact Methoid"
              placeHolder="Select Prefered Contact"
              options={[
                { label: "Email", value: "email" },
                { label: "Phone", value: "phone" },
              ]}
              value={formik.values.preferredContactMethod}
            />
            {/* <TextAreaInput
              label="Note"
              errors={formik.errors?.note}
              name="note"
              placeHolder="Notes Here"
              onChange={formik.handleChange}
              value={formik.values.note}
            /> */}
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-primary-danger text-sm">*</span>
              <span>Address</span>
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
