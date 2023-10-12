import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useGetAllDocumentsQuery } from "@/store/features/participants/documents/apiSliceleanq_support_coordinator";
import { useParticipantPlanQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { PlanInterface, PlanResponse } from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";

const usePlanDocumentList = () => {
    const { participantDetail } = useAppSelector(participantDetailState);
    const { data: userPlan } = useParticipantPlanQuery(participantDetail?.id!);

    const planData: PlanResponse | undefined = userPlan?.data;
    const plan: PlanInterface | null =
        planData && planData.length > 0 ? planData[0] : null;

    const { data, isLoading, isFetching, error } = useGetAllDocumentsQuery(plan?.id!);

    return { data, isLoading, isFetching, error }
}

export default usePlanDocumentList;