import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'products',
    initialState: {
        isFetching: false,
        product: [],
        error: null
    },
    reducers: {
        fetchingProductStart: (state, action) => {
            state.isFetching = true
        },
        fetchingSuccess: (state, action) => {
            state.isFetching = false
            state.product = action.payload;
        },
        Producterror: (state, action) => {
            state.isFetching = true
            state.product = action.payload;
        },
    }
})
export const { fetchingProductStart, fetchingSuccess, Producterror } = ProductSlice.actions;
export default ProductSlice.reducer;