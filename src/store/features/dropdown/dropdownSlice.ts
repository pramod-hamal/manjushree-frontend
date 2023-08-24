import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";


export interface Dropdown{
  label:string,value:string|number;
}

export interface DropdownSliceState{
  organizationalContact:Dropdown[]
}

export const initialState:DropdownSliceState = {
  organizationalContact:[]
}

export const dropdownSlice = createSlice({
  initialState,
  name:"dropdown",
  reducers:{},
  extraReducers:(build)=>({
  })
})

export const dropdownReducer = dropdownSlice.reducer;
export const {} = dropdownSlice.actions;

export const dropdownState = (state:RootState)=> state.dropdown;
