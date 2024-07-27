import { createSlice } from '@reduxjs/toolkit';

export const privacySlice = createSlice({
    name: 'privacy',
    initialState: false, // Estado inicial: no aceptado
    reducers: {
      acceptPrivacyPolicy: () => {
        return true; // Cambia el estado a aceptado
      },
    },
  });
  
  export const { acceptPrivacyPolicy } = privacySlice.actions;