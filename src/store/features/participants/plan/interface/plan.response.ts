
export interface PlanInterface {
    id?:        number;
    startDate: Date;
    endDate:   Date;
}

export type PlanResponse= PlanInterface[]