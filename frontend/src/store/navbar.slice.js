import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    navbar_public: {
        active: ""
    }
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActive: (state, action) =>{
        state.navbar_public.active = action.payload
    }
  },
});

export const { setActive } = navbarSlice.actions;
