import { createSlice } from "@reduxjs/toolkit";
import { original } from 'immer'


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        Quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.Quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity

        },
        removeProdByid: (state, action) => {
            state.products.splice(state.products.find(product => product._id === action.payload), 1)
        }
    }
})
export const { addProduct, removeProdByid } = cartSlice.actions
export default cartSlice.reducer;

