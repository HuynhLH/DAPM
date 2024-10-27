import { createSlice } from "@reduxjs/toolkit"; 

const userSlicedelete = createSlice({
    name: "user",
    initialState: {
        allUsers: null,
        isFetching: false,
        error: false,
        deleteSuccess: false, 
    },
    reducers: {
        getUsersStart: (state) => {
            state.isFetching = true; 
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false; 
            state.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.isFetching = false; 
            state.error = true; 
        },
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.deleteSuccess = false;
        },
        deleteUserSuccess: (state) => {
            state.isFetching = false;
            state.deleteSuccess = true;
        },
        deleteUserFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
} = userSlicedelete.actions;

export default userSlicedelete.reducer; 
