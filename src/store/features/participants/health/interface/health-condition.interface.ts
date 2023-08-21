
export interface HealthConditionInitialState {
  title: string;
  description: string;
  type: "CRITICAL" | "NORMAL";
  participantId?: number | string;
}
