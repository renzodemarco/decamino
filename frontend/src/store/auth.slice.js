import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../utilities/localStorage.util';

const initialState = loadState("auth") || {
  token: '', 
  user: {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveState("auth", action.payload)
    },
    logout: (state) => {
      state.token = '';
      state.user = {};
      saveState("auth", {
        token: '', 
        user: {}
      })
    },
    setToken: (state, action) => { 
      state.token = action.payload;
      saveState("auth", {
        token: action.payload, 
        user: state.user
      })
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      saveState("auth", {
        token: state.token, 
        user: {
          ...state.user,
          ...action.payload,
        }
      })
    },
  },
});

export const { login, logout, setToken, updateUser } = authSlice.actions;
