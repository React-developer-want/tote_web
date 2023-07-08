import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loggedInEmployee: {},
  },
  reducers: {
    setLoggedInEmployee: (state, action) => {
      state.loggedInEmployee = action.payload;
    }
  }
})

export const employeeReducer = employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;