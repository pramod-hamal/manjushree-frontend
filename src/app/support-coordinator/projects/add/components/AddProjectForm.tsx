"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CloseCircleOutlined } from "@ant-design/icons";



import {
  useParticipantsQuery,
  useServiceCoordinatorsQuery,
} from "@/store/features/dropdown/apiSliceleanq_support_coordinator";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput, {
  TextAreaInput,
} from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import CusDatePicker from "@/components/form/DatePickerleanq_support_coordinator";
import useAddProject from "../hook/useAddProject";


export interface CreateProjectDTO {
  title: string;
  date: Date | null;
  description: string;
  participantId: number | null;
  supportCoordinatorIds: number[];
  planServiceId: number | null;
}

export default function AddProjectForm() {

  const { data: serviceCoordinators } = useServiceCoordinatorsQuery("");
  const { data: participants } = useParticipantsQuery("");

  const { formik, handleRemoveCoordinators, participantPlanServices } = useAddProject();

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Project details</span>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            name="title"
            label="Title"
            required={true}
            onChange={formik.handleChange}
            errors={""}
            value={formik.values.title}
          />
          <CusSelect
            options={participants?.data ?? []}
            placeHolder="Select Participants"
            label="Add Participant"
            onChange={(selectedData: any) => {
              formik.setFieldValue("participantId", selectedData);
              formik.setFieldValue("planServiceId", null)
            }}
            required={true}
            value={formik.values.participantId}
            errors={""}
          />
          <CusSelect
            options={participantPlanServices?.data ?? []}
            placeHolder="Select Service"
            label="Select Service"
            onChange={(selectedData: any) => {
              formik.setFieldValue("planServiceId", selectedData);
            }}
            required={true}
            value={formik.values.planServiceId}
            errors={""}
          />
          <CusDatePicker
            disabled={false}
            label="Due Date"
            required={true}
            name="date"
            onChange={(_: any, dateString: string) => {
              formik.setFieldValue("date", dateString)
            }}
            errors={formik.errors?.date}
            value={formik.values.date} />
          <div>
            <CusSelect
              options={serviceCoordinators?.data ?? []}
              placeHolder="Select Service Coordinators"
              label="Service Coordinators"
              onChange={(selectedValue: any) => {
                const getSelectedLabel: any = serviceCoordinators?.data.filter(
                  (item: any) => item.value === selectedValue
                );
                formik.setFieldValue("supportCoordinatorIds", [
                  ...formik.values.supportCoordinatorIds,
                  getSelectedLabel[0],
                ]);
              }}
              required={true}
              value={""}
              errors={formik.errors?.supportCoordinatorIds}
            />
            <div className="flex gap-3 flex-wrap">
              {formik.values.supportCoordinatorIds.map(
                (item: any, index: number) => {
                  return (
                    <div
                      className="bg-gray-200 mt-3 p-2 text-black flex gap-1 items-center"
                      key={index}
                    >
                      <span>{item.label}</span>
                      <CloseCircleOutlined
                        onClick={() => handleRemoveCoordinators(index)}
                        className="text-primary-danger"
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <TextAreaInput
            name="description"
            placeHolder="Description Here"
            label="Description"
            required={true}
            onChange={formik.handleChange}
            errors={formik.errors?.description}
            value={formik.values.description}
          />
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton
            title="Submit"
            type="submit"
            loading={formik.isSubmitting}
          />
          <CancelButton onClick={() => { }} />
        </div>
      </form>
    </div>
  );
}
