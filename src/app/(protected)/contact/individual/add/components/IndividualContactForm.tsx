"use client";

import React, { useEffect } from "react";

import useFormBuilder from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import useCurrentLocation from "@/hooks/currentLocation/useCurrentLocationleanq_support_coordinator";

import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import { TextAreaInput } from "@/components/form/FormInputleanq_support_coordinator";
import MapComponent, {
  LatLng,
  getNameByLatLang,
} from "@/components/map/Mapleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import {
  AddIndividualContactDTO,
  Address,
} from "../../interface/contact.interface";
import {
  useAddIndividualContactMutation,
  useUpdateIndividualContactMutation,
} from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import { FormikHelpers } from "formik";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routesleanq_support_coordinator";

const initialValues: AddIndividualContactDTO = {
  name: "",
  email: "",
  isOrganization: false,
  note: "",
  occupationService: "",
  preferredContactMethod: "",
};

export interface IndividualContactFormProps {
  editMode?: boolean;
  values?: any;
}

export default function IndividualContactForm({
  editMode,
  values,
}: IndividualContactFormProps) {
  const router = useRouter();
  const showToast = useToast();
  const { location, error } = useCurrentLocation();
  const [addContact] = useAddIndividualContactMutation();
  const [updateContact] = useUpdateIndividualContactMutation();

  const handleAddContact = async (
    values: AddIndividualContactDTO,
    { setSubmitting }: FormikHelpers<AddIndividualContactDTO>
  ) => {
    try {
      const { data, error }: any = await addContact(values);
      if (data) {
        formik.resetForm();
        showToast({ title: "Contact Created Successfully", type: "success" });
        router.replace(routes.individualContact);
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        showToast({ title: errorData.data?.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
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
        const errorData: APIBaseResponse<any, null> = error.data;
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
    formFields,
    onSubmit: editMode === true ? handleEditContact : handleAddContact,
  });

  useEffect(() => {
    if (editMode === true && values !== null) {
      formik.setValues(values);
    }
  }, [editMode, values]);

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
              onChange={(selectedValue: any) =>
                formik.setFieldValue("preferredContactMethod", selectedValue)
              }
              required={true}
              label="Prefered Contact"
              placeHolder="Select Prefered Contact"
              options={[
                { label: "Email", value: "email" },
                { label: "Phone", value: "phone" },
              ]}
              value={formik.values.preferredContactMethod}
            />
            <TextAreaInput
              label="Note"
              errors={formik.errors?.note}
              name="note"
              placeHolder="Notes Here"
              onChange={formik.handleChange}
              value={formik.values.note}
            />
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
          <FlatButton
            title={editMode === true ? "Edit" : "Submit"}
            type="submit"
            loading={formik.isSubmitting}
          />
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
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    required: true,
  },
  {
    name: "occupationService",
    label: "Occupation",
    placeHolder: "Occupation",
    type: "text",
    required: true,
  },
];
