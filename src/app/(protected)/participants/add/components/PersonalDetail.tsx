import React from "react";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

export default function PersonalDetail({ formik }: any) {
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
          />
          <FormInput
            errors={errors?.middleName}
            name="middleName"
            label="Middle Name"
            required={true}
            onChange={handleChange}
            value={values.middleName}
          />
          <FormInput
            errors={errors?.lastName}
            name="lastName"
            label="Last Name"
            required={true}
            onChange={handleChange}
            value={values.lastName}
          />
          <FormInput
            errors={errors?.phone}
            name="phone"
            label="Phone Number"
            type="number"
            required={true}
            onChange={handleChange}
            value={values.phone}
          />
          <FormInput
            errors={errors?.email}
            name="email"
            label="Email"
            required={true}
            onChange={handleChange}
            value={values.email}
          />
          <FormInput
            errors={errors?.dateOfBirth}
            name="dateOfBirth"
            label="Date of birth"
            required={true}
            onChange={handleChange}
            type="date"
            value={values.dateOfBirth}
          />
          <CusSelect
            value={values.gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
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
            required={true}
            onChange={handleChange}
            value={values.preferredLanguage}
          />

          <FormInput
            errors={errors?.pronouns}
            name="pronouns"
            label="Pronouns"
            required={true}
            onChange={handleChange}
            value={values.pronouns}
          />
          <FormInput
            errors={errors?.ndisNumber}
            name="ndisNumber"
            label="NDIS Number"
            required={true}
            type="number"
            onChange={handleChange}
            value={values.ndisNumber}
          />
        </div>
      </div>
    </div>
  );
}
