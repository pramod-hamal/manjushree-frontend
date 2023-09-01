"use client";

import React from "react";
import { useFormik } from "formik";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput, {
  TextAreaInput,
} from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

import {
  useParticipantsQuery,
  usePlanServicesQuery,
  useServiceCoordinatorsQuery,
} from "@/store/features/dropdown/apiSliceleanq_support_coordinator";
import { useAddProjectMutation } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routesleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

export interface CreateProjectDTO {
  title: string;
  date: Date | null;
  description: string;
  participantId: number | null;
  suppportCoordinatorIds: number[];
  planServiceId: number | null;
}

export default function AddProjectForm() {
  const router = useRouter();

  const { data: planServices } = usePlanServicesQuery("");
  const { data: serviceCoordinators } = useServiceCoordinatorsQuery("");
  const { data: participants } = useParticipantsQuery("");

  const [addProject] = useAddProjectMutation();

  const showToast = useToast();

  const formik = useFormik({
    initialValues: {
      title: "",
      date: null,
      description: "",
      participantId: null,
      suppportCoordinatorIds: [],
      planServiceId: null,
    },
    onSubmit: async (values: any, { setSubmitting }: any) => {
      await addProject(values)
        .unwrap()
        .then(() => {
          formik.resetForm();
          showToast({ title: "Project Created", type: "success" });
          router.push(routes.projects);
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

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
            options={planServices?.data ?? []}
            placeHolder="Select Service"
            label="Selecct Service"
            onChange={(selectedData: any) => {
              formik.setFieldValue("planServiceId", selectedData);
            }}
            required={true}
            value={formik.values.planServiceId}
            errors={""}
          />
          <CusSelect
            options={participants?.data ?? []}
            placeHolder="Select Participants"
            label="Add Participant"
            onChange={(selectedData: any) => {
              formik.setFieldValue("participantId", selectedData);
            }}
            required={true}
            value={formik.values.participantId}
            errors={""}
          />
          <FormInput
            name="date"
            type="date"
            label="Date"
            required={true}
            onChange={formik.handleChange}
            errors={formik.errors?.date}
            value={formik.values.date}
          />
          <div>
            <CusSelect
              options={serviceCoordinators?.data ?? []}
              placeHolder="Select Service Coordinators"
              label="Service Coordinators"
              onChange={(selectedValue: any) => {
                formik.setFieldValue("suppportCoordinatorIds", [
                  ...formik.values.suppportCoordinatorIds,
                  selectedValue,
                ]);
              }}
              required={true}
              value={""}
              errors={formik.errors?.suppportCoordinatorIds}
            />
            <div className="flex gap-3">
              {formik.values.suppportCoordinatorIds.map(
                (item: any, index: number) => {
                  return <div key={index}>{item}</div>;
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
          <CancelButton onClick={() => {}} />
        </div>
      </form>
    </div>
  );
}
