import { useEffect, useState } from "react";
import { PaginatedTableValue } from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

import { useGetPlanServicesQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";

import useGetParticipantPlan, { GetParticipantPlanProps } from "../../../../hook/useGetParticipantPlan";
import useGetParticipantDetail from "../../../../hook/useGetParticipant";

const useServiceListHook = ({ pagination }: { pagination: PaginatedTableValue }) => {
    const { paginationMeta, setPaginationMeta } = pagination;
    const [show, setShow] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [serviceDetail, setServiceDetail] = useState<any | null>(null)

    const participant = useGetParticipantDetail();
    const { plan }: GetParticipantPlanProps = useGetParticipantPlan(
        { id: participant?.id! }
    );

    const { data, isLoading, isFetching } = useGetPlanServicesQuery({
        limit: paginationMeta.limit,
        page: paginationMeta.page ?? 1,
        plan: plan?.id!, participant: participant?.id!
    });

    const onRowClick = (rowData: any) => {
        setShowDetail(true);
        setServiceDetail(rowData)
    }

    const onServiceFormClose = () => setShow(false)
    const onServiceFormOpen = () => setShow(true)

    const handleDetailDrawerToogle = () => {
        setShowDetail(false);
        setServiceDetail(null);
    }

    useEffect(() => {
        if (data && data?.meta) {
            setPaginationMeta(data?.meta);
        }
    }, [data, setPaginationMeta]);

    return {
        planService: { data, isLoading, isFetching },
        onRowClick, onServiceFormClose, onServiceFormOpen,
        handleDetailDrawerToogle,
        plan,
        serviceDetail,
        setServiceDetail,
        show,
        showDetail,
    }
}

export default useServiceListHook;