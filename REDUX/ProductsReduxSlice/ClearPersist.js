
import { PURGE } from "redux-persist"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const clearSlice = createSlice({
    name: 'clear',

    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            customEntityAdapter.removeAll(state);
        });
    }
})
