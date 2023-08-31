import { createSlice } from "@reduxjs/toolkit";

const initialState =[]

export const allNotesSlice = createSlice({
  name: "allNotes",
  initialState,
  reducers: {

    allNotes: (state, action) => {
      return action.payload;
    },
  }
})

export const {allNotes} =
allNotesSlice.actions;

export default allNotesSlice.reducer;
