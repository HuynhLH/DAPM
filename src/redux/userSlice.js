import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            allUsers: null,
            isFetching: false, 
            error: false,
        },
    },
    reducers: {
        getUsersStart: (state) => {
            state.user.isFetching = true; 
        },
        getUsersSuccess: (state, action) => {
            state.user.isFetching = false; 
            state.user.allUsers = action.payload;
        },
        getUsersFailed: (state, action) => {
            state.user.isFetching = false; 
            state.user.error = true; 
            console.error(action.payload); 
        },
    },
});


export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed
} = userSlice.actions;

export default userSlice.reducer;
