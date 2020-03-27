import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    changeText: (state, action) => action.payload,
  },
});

export const { changeText } = searchSlice.actions;

export default searchSlice.reducer;
