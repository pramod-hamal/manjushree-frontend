import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";

export interface ParticipantDetailPlanState {
 budgetDrawer:boolean;
 serviceDrawer:boolean;
}

const initialState: ParticipantDetailPlanState = {
 budgetDrawer:false,
 serviceDrawer:false,
};

const participantDetailPlanSlice = createSlice({
  name: "Participant Detail Plan Slice",
  initialState,
  reducers: {
   toogleBudgetDrawer(state,action){
    state.budgetDrawer= action.payload
   },
   toogleServiceDrawer(state,action){
    state.serviceDrawer=action.payload
   }
  },
});

export const {
  toogleBudgetDrawer,toogleServiceDrawer
} = participantDetailPlanSlice.actions;

export const participantDetailPlanReducer = participantDetailPlanSlice.reducer;

export const participantDetailPlan = (state: RootState) => state.participantDetailPlan;
