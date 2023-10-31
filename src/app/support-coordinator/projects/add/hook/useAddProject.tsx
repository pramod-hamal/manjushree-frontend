import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useParticipantPlanServiceQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";
import { useAddProjectMutation } from "@/store/features/projects/apiSliceleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

const useAddProject = () => {

    const [addProject] = useAddProjectMutation();

    const showToast = useToast();
    const router = useRouter();

    const initialValues = {
        title: "",
        date: null,
        description: "",
        participantId: null,
        supportCoordinatorIds: [],
        planServiceId: null,
    }

    const onSubmit = async (values: any, { setSubmitting }: any) => {
        const projectValues = {
            ...values,
            supportCoordinatorIds: values.supportCoordinatorIds.map(
                (item: Dropdown) => item.value
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
                formik.setErrors(error?.data?.error);
                showToast({
                    title: error?.data?.message ?? "Something went wrong",
                    type: "error",
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    const handleRemoveCoordinators = (index: number) => {
        let newSupportCoordinators = formik.values.supportCoordinatorIds;
        newSupportCoordinators.splice(index, 1);
        formik.setFieldValue("references", newSupportCoordinators);
    };

    const { data: participantPlanServices } = useParticipantPlanServiceQuery({ participant: formik.values.participantId! }, {
        skip: formik.values.participantId === null
    })

    return { formik, handleRemoveCoordinators, participantPlanServices }
}

export default useAddProject;