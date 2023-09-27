"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";

import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import useCurrentLocation from "@/core/hooks/currentLocation/useCurrentLocationleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import { multiFormData } from "@/core/lib/append-form-dataleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import {
  useAddOrganizationalContactMutation,
  useUpdateOrganizationalContactMutation,
} from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { usePlanServicesQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import MapComponent, {
  LatLng,
  getNameByLatLang,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

import {
  OrganizationContactDTO,
  OrganizationContactFormProps,
} from "../interface/add-organization.interface";
import { Address } from "../../../individual/interface/contact.interface";
import { initialValues, validationSchema, formFields } from "../form-utils";

export default function OrganizationalContactForm({
  editMode,
  value,
}: OrganizationContactFormProps) {
  const router = useRouter();

  const { location, error } = useCurrentLocation();
  const showToast = useToast();

  const [add] = useAddOrganizationalContactMutation();
  const [update] = useUpdateOrganizationalContactMutation();
  const { data: planServices } = usePlanServicesQuery("");

  const handleGeoLocation = async (position: LatLng) => {
    const place = await getNameByLatLang(position);
    const address: Address = {
      latitude: position.lat,
      longitude: position.lng,
      name: place,
    };
    formik.setFieldValue("address", address);
  };

  const handleAdd = async (
    values: OrganizationContactDTO,
    { setSubmitting }: FormikHelpers<OrganizationContactDTO>
  ) => {
    const formData = multiFormData(values);
    return await add(formData).unwrap().then((_: any) => {
      showToast({ title: "Organization Added", type: "success" });
      router.replace(routes.organizationalContact);
    }).catch((error: any) => {
      const errorData: APIBaseResponse<any> = error.data;
      formik.setErrors(errorData.error)
      showToast({ title: errorData.message, type: "error" });
    }).finally(() => { setSubmitting(false) });
  };

  const handleEdit = async (
    values: OrganizationContactDTO,
    { setSubmitting }: FormikHelpers<OrganizationContactDTO>
  ) => {
    await update(values).unwrap().then(() => {
      showToast({ title: "Update Successfully", type: "success" });
      router.replace(routes.organizationalContact);
    }).catch(() => {
      const errorData: APIBaseResponse<any> = error.data;
      showToast({ title: errorData.message, type: "error" });
    }).finally(() => {
      setSubmitting(false);
    });
  };

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    validationSchema,
    formFields,
    onSubmit: editMode === true ? handleEdit : handleAdd,
  });

  useEffect(() => {
    if (editMode === true && value !== null) {
      formik.setValues({
        ...value, address: {
          ...value.address,
          latitude: value.address.latitude ? Number(value.address.latitude) : location.lat,
          longitude: value.address.longitude ? Number(value.address.longitude) : location.lng,
        }
      });
    }
  }, [editMode, value]);

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
              options={planServices?.data ?? []}
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
