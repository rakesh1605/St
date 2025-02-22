import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseinput: {
    level: "beginner", // Default to "beginner"
    duration: "1hr",       // Default to "1hr"
    video: "yes",          // Default to "yes"
    chapters: "",          // Default to an empty string
  },
};

const courseinputSlice = createSlice({
  name: 'courseinput',
  initialState,
  reducers: {
    setCourseInput: (state, action) => {
      state.courseinput = action.payload; // Update state with the payload
    },
  },
});

export const { setCourseInput } = courseinputSlice.actions; // Export the action
export default courseinputSlice.reducer; // Export the reducer
