import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  layout: null,
}
  


const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayOut: (state, action) => {
      state.layout = action.payload; // Update state with the payload
    },
  },
});

export const { setLayOut } = layoutSlice.actions; // Export the action
export default layoutSlice.reducer; // Export the reducer
