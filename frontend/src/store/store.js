import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth.slice";
import { routeSlice } from "./route.slice";
import { privacySlice } from "./privacy.slice";
import { modalSlice } from "./modal.slice";
import { navbarSlice } from "./navbar.slice";
import { commerceSlice } from "./commerce.slice";


export const store = configureStore({
  reducer: {
    authLogin: authSlice.reducer,
    route: routeSlice.reducer, // Asegúrate de que el nombre aquí coincida con el utilizado en useSelector
    privacy: privacySlice.reducer,
    modal: modalSlice.reducer,
    navbars: navbarSlice.reducer,
    commerce: commerceSlice.reducer
  },
});
