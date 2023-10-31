import React from "react";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import CusDatePicker from "@/components/form/DatePickerleanq_support_coordinator";

export default function PersonalDetail({ formik, disabled }: any) {
  const { handleChange, values, errors } = formik;
  return (
    <div>
      <span className="text-2xl font-semibold ">Personal details</span>
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            errors={errors?.firstName}
            name="firstName"
            label="First Name"
            required={true}
            onChange={handleChange}
            value={values.firstName}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.middleName}
            name="middleName"
            label="Middle Name"
            onChange={handleChange}
            value={values.middleName}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.lastName}
            name="lastName"
            label="Last Name"
            required={true}
            onChange={handleChange}
            value={values.lastName}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.preferredName}
            name="preferredName"
            label="Preferred Name"
            onChange={handleChange}
            value={values?.preferredName}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.phone}
            copy={true}
            name="phone"
            label="Phone Number"
            type="number"
            required={true}
            onChange={handleChange}
            value={values.phone}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.email}
            copy={true}
            name="email"
            label="Email"
            required={true}
            onChange={handleChange}
            value={values.email}
            disabled={disabled}
          />
          <CusDatePicker
            label="Date of birth"
            required={true}
            disabled={disabled}
            name="dateOfBirth"
            onChange={(date: any, dateString: any) => {
              formik.setFieldValue("dateOfBirth", dateString)
            }}
            errors={errors?.dateOfBirth}
            value={values.dateOfBirth} />
          <CusSelect
            value={values.gender}
            disabled={disabled}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            required={true}
            placeHolder="Select Gender"
            label="Select Gender"
            onChange={(selected: any) => {
              formik.setFieldValue("gender", selected);
            }}
            errors={errors?.gender}
          />
          <FormInput
            errors={errors?.preferredLanguage}
            name="preferredLanguage"
            label="Prefered Language"
            onChange={handleChange}
            value={values.preferredLanguage}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.pronouns}
            name="pronouns"
            label="Pronouns"
            onChange={handleChange}
            value={values.pronouns}
            disabled={disabled}
          />
          <FormInput
            errors={errors?.ndisNumber}
            copy={true}
            name="ndisNumber"
            label="NDIS Number"
            required={true}
            type="number"
            onChange={handleChange}
            value={values.ndisNumber}
            disabled={disabled}
          />
          <CusSelect
            value={values.state}
            disabled={disabled}
            options={[
              { value: "AU", label: "AU" },
              { value: "EU", label: "EU" },
            ]}
            required={true}
            placeHolder="Select State"
            label="Select State"
            onChange={(selected: any) => {
              formik.setFieldValue("state", selected);
            }}
            errors={errors?.gender}
          />
        </div>
      </div>
    </div>
  );
}
