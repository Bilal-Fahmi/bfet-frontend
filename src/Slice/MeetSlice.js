import { createSlice } from "@reduxjs/toolkit";

export const meetSlice = createSlice({
  name: "meet",
  initialState: {
    name: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = meetSlice.actions;
export const selectMeet = (state) => state.meet;
export default meetSlice.reducer;
