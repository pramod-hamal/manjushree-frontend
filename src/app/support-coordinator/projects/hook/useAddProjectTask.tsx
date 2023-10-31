import { FormikHelpers } from "formik";
import * as yup from 'yup';

import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useAddProjectTakMutation } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import { projectData } from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";

import { AddTaskDto, AddTaskProps } from "../components/projectDetail/AddTask";

const useAddProjectTask = ({ sc, participant, onClose }: AddTaskProps) => {
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

    const onSubmit = (values: AddTaskDto, { setSubmitting }: FormikHelpers<AddTaskDto>): Promise<void> => add(values).unwrap()
        .then((data) => {
            formik.resetForm();
            onClose();
            showToast({ title: "Task Added", type: "success" })
        })
        .catch((err) => { console.log(err) })
        .finally(() => setSubmitting(false))


    const validationSchema = yup.object().shape({
        title: yup.string().required("Required"),
        description: yup.string().required("Required"),
        supportCoordinatorId: yup.string().required("Plese Select Employee"),
    });

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
    return { formik, renderFormFields }
}

export default useAddProjectTask;