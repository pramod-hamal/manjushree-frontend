import React from "react";
import * as yup from 'yup';
import { FormikHelpers } from "formik";

import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { projectData } from "@/store/features/projects/projectSliceleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { useAddProjectTakMutation } from "@/store/features/projects/apiSliceleanq_support_coordinator";

export interface AddTaskDto {
  title: string;
  description: string;
  participantId: number | string;
  supportCoordinatorId: number | null;
  projectId: number | string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  supportCoordinatorId: yup.string().required("Plese Select Employee"),
});

export interface AddTaskProps { sc: Dropdown[], participant: Dropdown[], onClose: () => void }

export default function AddTask({ sc, participant, onClose }: AddTaskProps) {
  const showToast = useToast()
  const { selectedProject } = useAppSelector(projectData);

  const [add] = useAddProjectTakMutation();

  const initialValues: AddTaskDto = {
    description: "",
    participantId: participant[0]?.value,
    projectId: selectedProject?.id,
    supportCoordinatorId: null,
    title: ""
  }

  const onSubmit = (values: AddTaskDto, { setSubmitting }: FormikHelpers<AddTaskDto>) => add(values).unwrap()
    .then((data) => {
      formik.resetForm();
      onClose();
      showToast({ title: "Task Added", type: "success" })
    })
    .catch((err) => { console.log(err) })
    .finally(() => setSubmitting(false))

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    validationSchema,
    onSubmit,
    formFields: [
      { name: "title", type: "text", label: "Title", placeHolder: "Title" },
      { name: "description", type: "textarea", label: "Description", placeHolder: "Description" },
      { name: "supportCoordinatorId", type: "select", placeHolder: "Select Employee", label: "Employee", options: sc ?? [] },
    ]
  })

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={formik.handleSubmit}>
      {renderFormFields()}
      <div>
        <FlatButton loading={formik.isSubmitting} title="Submit" type="submit" />
      </div>
    </form>
  );
}
