import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        title: "",
        description: "",
        photos: [],
        location: [],
        cuisine: [],
        dineIn: false,
        takeAway: false,
        rating: 0
    }
};

export const commerceSlice = createSlice({
    name: 'commerce',
    initialState,
    reducers: {
        setCommerce: (state, action) =>{
            state.data = action.payload
        },
        setPathCommerce: (state, action) => {
            state = {...state.data, ...action.payload}
        }
    },
});

export const { setCommerce, setPathCommerce } = commerceSlice.actions;
