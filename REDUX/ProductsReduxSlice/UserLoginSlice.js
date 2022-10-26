import { createSlice } from "@reduxjs/toolkit";


const UserLoginSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        currentUser: null,
        error: null
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.error = null
        },
        loginErr: (state, action) => {
            state.isFetching = false
            state.error = action.payload.response.data
        },
    }
})
export const { loginStart, loginSuccess, loginErr } = UserLoginSlice.actions;
export default UserLoginSlice.reducer;

