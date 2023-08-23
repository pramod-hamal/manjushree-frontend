"use client";

import React, { useEffect } from "react";

import useFormBuilder from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import MapComponent, {
  LatLng,
  getNameByLatLang,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import useCurrentLocation from "@/hooks/currentLocation/useCurrentLocationleanq_support_coordinator";
import { Address } from "../../../individual/interface/contact.interface";
import {
  useAddOrganizationalContactMutation,
  useUpdateOrganizationalContactMutation,
} from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { multiFormData } from "@/lib/append-form-dataleanq_support_coordinator";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routesleanq_support_coordinator";

interface OrganizationContactFormProps {
  editMode: boolean;
  value?: any;
}

interface OrganizationContactDTO {
  name: string;
  email: string;
  occupationService: string;
  preferredContactMethod: string;
  isOrganization?: boolean;
  phone: string;
  note: string;
  url: string;
  address: Address;
  logo?: null;
}

export default function OrganizationalContactForm({
  editMode,
  value,
}: OrganizationContactFormProps) {
  const router = useRouter();
  const showToast = useToast();
  const { location, error } = useCurrentLocation();
  const [add] = useAddOrganizationalContactMutation();
  const [update] = useUpdateOrganizationalContactMutation();

  const handleAdd = async (
    values: OrganizationContactDTO,
    { setSubmitting }: FormikHelpers<OrganizationContactDTO>
  ) => {
    try {
      const formData = multiFormData(values);
      const { data, error }: any = await add(formData);
      if (data) {
        showToast({
          title: "Organization Added",
          type: "success",
        });
        router.replace(routes.organizationalContact);
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        showToast({
          title: errorData.message,
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (
    values: OrganizationContactDTO,
    { setSubmitting }: FormikHelpers<OrganizationContactDTO>
  ) => {
    try {
      const { data, error }: any = await update(values);
      if (data) {
        console.log(data);
        showToast({
          title: "Update Successfully",
          type: "success",
        });
        router.replace(routes.organizationalContact);
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        showToast({
          title: errorData.message,
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: OrganizationContactDTO = {
    name: "",
    email: "",
    occupationService: "",
    preferredContactMethod: "",
    isOrganization: true,
    phone: "",
    note: "Test Note",
    url: "",
    address: { name: "" },
    logo: null,
  };

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    formFields,
    onSubmit: editMode === true ? handleEdit : handleAdd,
  });

  useEffect(() => {
    if (editMode === true && value !== null) {
      formik.setValues(value);
    }
  }, [editMode, value]);

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
              name="url"
              onChange={formik.handleChange}
              label="URL"
              placeHolder="URL"
              value={formik.values?.url}
            />
            <FormInput
              errors={""}
              name="occupationService"
              onChange={formik.handleChange}
              label="Service"
              placeHolder="Service"
              value={formik.values?.occupationService}
            />
            {editMode !== true && (
              <div className="gap-3 flex flex-col">
                <div className="flex gap-2 items-center">
                  <span>Logo</span>
                </div>
                <FileUpload
                  onChange={(file: any) => {
                    formik.setFieldValue("logo", file.file);
                  }}
                  value={null}
                />
              </div>
            )}
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-primary-danger text-sm">*</span>
              <span>Address</span>
            </div>
            <MapComponent
              center={location}
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
          <FlatButton title={editMode ? "Edit" : "Submit"} type="submit" />
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
    name: "phone",
    label: "Phone Number",
    placeHolder: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "preferredContactMethod",
    label: "Prefered Contact",
    placeHolder: "Select contact method",
    type: "select",
    options: [
      { label: "Email", value: "Email" },
      { label: "Phone", value: "Phone" },
    ],
  },
  {
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    required: true,
  },
];
