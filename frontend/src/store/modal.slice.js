import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: null, // Estado inicial desconocido
  reducers: {
    setCookieAcceptance: (state, action) => {
      return action.payload; // Actualiza el estado con la aceptación del usuario
    },
  },
});

export const { setCookieAcceptance } = modalSlice.actions;
