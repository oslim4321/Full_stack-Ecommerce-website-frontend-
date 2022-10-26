// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios'

// const initialState = {
//     loading: false,
//     user: '',
//     error:''
// }

// // GEnerate pending dullfil
// const token = localStorage.getItem('token')
//     export const getSingleUserDetails = createAsyncThunk('user/fetchuser' ,()=>{ 
//       return axios.get('https://oslim-school-portals-api.herokuapp.com/userdasboard', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       .then((response) =>  response.data)})

    
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     extraReducers: (builder) => {
        
//        builder.addCase(getSingleUserDetails.pending, (state) => {
//        state.loading=true
//        })
//        builder.addCase(getSingleUserDetails.fulfilled, (state,action) => {
//            state.loading = false
//            state.user = action.payload
//            state.error = ''
//        })
//        builder.addCase(getSingleUserDetails.rejected, (state,action) => {
//            state.loading = false
//            state.user = []
//            state.error = action.error.message
//        })
//     }
// })

// export default userSlice.reducer
