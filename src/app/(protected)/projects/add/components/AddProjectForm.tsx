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
import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";
import { CloseCircleOutlined } from "@ant-design/icons";

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
      const projectValues = {
        ...values,
        suppportCoordinatorIds: values.suppportCoordinatorIds.map(
          (item: Dropdown) => {
            return item.value;
          }
        ),
      };
      await addProject(projectValues)
        .unwrap()
        .then(() => {
          formik.resetForm();
          showToast({ title: "Project Created", type: "success" });
          router.push(routes.projects);
        })
        .catch((error) => {
          showToast({
            title: error?.data?.message ?? "Something went wrong",
            type: "error",
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handleRemoveCoordinators = (index:number) => {
     let newSupportCoordinators = formik.values.suppportCoordinatorIds;
     newSupportCoordinators.splice(index, 1);
     formik.setFieldValue("references", newSupportCoordinators);
  };

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
                const getSelectedLabel: any = serviceCoordinators?.data.filter(
                  (item: any) => item.value === selectedValue
                );
                formik.setFieldValue("suppportCoordinatorIds", [
                  ...formik.values.suppportCoordinatorIds,
                  getSelectedLabel[0],
                ]);
              }}
              required={true}
              value={""}
              errors={formik.errors?.suppportCoordinatorIds}
            />
            <div className="flex gap-3 flex-wrap">
              {formik.values.suppportCoordinatorIds.map(
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
          <CancelButton onClick={() => {}} />
        </div>
      </form>
    </div>
  );
}
