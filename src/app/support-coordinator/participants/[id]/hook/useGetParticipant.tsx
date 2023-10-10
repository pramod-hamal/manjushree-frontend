import { ParticipantDetailSlice, participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";

const useGetParticipantDetail = () => {
    const { participantDetail }: ParticipantDetailSlice = useAppSelector(
        participantDetailState
    );

    return participantDetail
}

export default useGetParticipantDetail;