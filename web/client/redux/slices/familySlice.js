import { createSlice } from "@reduxjs/toolkit";

export const familySlice = createSlice({
  name: "family",
  initialState: {
    families: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFamilyRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchFamilySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.families = [...state.families, action.payload];
    },
    fetchFamilyFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearLastFamily: (state) => {
      state.families.pop();
    },
  },
});

export const {
  fetchFamilyRequest,
  fetchFamilySuccess,
  fetchFamilyFailed,
  clearLastFamily,
} = familySlice.actions;

export default familySlice.reducer;
