import { createSlice } from "@reduxjs/toolkit";
import { isHeaderHidden } from "../../utils/isHeaderHidden";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isActive: false,
    isHidden: isHeaderHidden(window.location.pathname),
  },
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setHeaderHidden: (state, action) => {
      state.isHidden = action.payload;
    }
  }
})

export const navbarReducer = navbarSlice.reducer;
export const navbarActions = navbarSlice.actions;