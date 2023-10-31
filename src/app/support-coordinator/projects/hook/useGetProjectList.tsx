import { useEffect } from "react";

import { PaginatedTableValue } from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

import { useProjectListQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import { clearSelected, selectProject, toogleProjectDrawer } from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useAppDispatch } from "@/store/hooksleanq_support_coordinator";

const useGetProjectList = (value: PaginatedTableValue, searchText: string) => {
    const { paginationMeta, setPaginationMeta } = value;
    const dispatch = useAppDispatch();

    const { data, isLoading, isFetching, error } = useProjectListQuery({
        limit: paginationMeta.limit,
        page: paginationMeta.page ?? 1,
        searchText
    });

    useEffect(() => {
        if (data && data?.meta) {
            setPaginationMeta(data?.meta);
        }
    }, [data, setPaginationMeta]);


    const onRowClick = (row: any) => {
        dispatch(selectProject(row));
        dispatch(toogleProjectDrawer(true));
    }

    const handleDrawerToogle = () => {
        dispatch(clearSelected());
        dispatch(toogleProjectDrawer(false));
    }

    return { isLoading, isFetching, data, onRowClick, handleDrawerToogle }
}

export default useGetProjectList;