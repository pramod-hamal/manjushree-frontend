import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { useParticipantPlanQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { PlanInterface, PlanResponse } from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";

export interface GetParticipantPlanProps {
    plan: PlanInterface | null,
    error: FetchBaseQueryError | SerializedError | undefined,
    isLoading: boolean
}

const useGetParticipantPlan = ({ id }: { id: string | number }): GetParticipantPlanProps => {
    const { data, error, isLoading } = useParticipantPlanQuery(
        id!
    );

    const planData: PlanResponse | undefined = data?.data;
    const plan: PlanInterface | null =
        planData && planData.length > 0 ? planData[0] : null;

    return { plan, error, isLoading }
}

export default useGetParticipantPlan;