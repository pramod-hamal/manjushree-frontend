
export interface PlanInterface {
    id?: number;
    startDate: Date;
    endDate: Date;
}

export type PlanResponse = PlanInterface[];

export interface CreatePlanDTO {
    startDate: any;
    endDate: any;
    participantId: number | string | null
};