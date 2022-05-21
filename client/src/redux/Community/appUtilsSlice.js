import { createSlice } from "@reduxjs/toolkit";

export const appUtilsSlice = createSlice({
  name: "appUtils",
  initialState: {
    sidebar: true
  },
  reducers: {
    TOGGLE_SIDEBAR: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.sidebar = !state.sidebar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { TOGGLE_SIDEBAR} =
appUtilsSlice.actions;

export default appUtilsSlice.reducer;
