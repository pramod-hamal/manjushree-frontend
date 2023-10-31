import { useEffect } from "react";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

import { useLazyGetByIdQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import { projectData } from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";

const useGetProjectDetail = () => {
    const { selectedProject } = useAppSelector(projectData);
    const [fetch, { data, isLoading, isFetching, error }] = useLazyGetByIdQuery();

    const supportCoordinators: Dropdown[] = data?.supportCoordinators?.map((sc: any) => {
        return { label: sc.firstName + sc.middleName ?? " " + sc.lastName ?? " ", value: sc.id }
    });

    const participant: Dropdown[] = [{
        label: data?.participant?.firstName + data?.participant?.middleName ?? " " + data?.participant?.lastName,
        value: data?.participant?.id
    }]

    useEffect(() => {
        if (selectedProject) {
            fetch(selectedProject?.id);
        }
    }, [fetch, selectedProject])

    return { supportCoordinators, participant, data, isFetching }
}

export default useGetProjectDetail;