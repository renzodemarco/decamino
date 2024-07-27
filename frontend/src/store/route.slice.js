import { createSlice } from '@reduxjs/toolkit';

export const routeSlice = createSlice({
  name: 'route',
  initialState: {
    startLocation: [-33.945426,-61.7270205,6],
    endLocation: [-38.416097,-63.616672],
  },
  reducers: {
    setStartLocation: (state, action) => {
      state.startLocation = action.payload;
    },
    setEndLocation: (state, action) => {
      state.endLocation = action.payload;
    },
  },
});

export const { setStartLocation, setEndLocation } = routeSlice.actions;

