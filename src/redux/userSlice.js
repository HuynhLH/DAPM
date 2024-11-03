import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            allUsers: [],  // Khởi tạo như một mảng rỗng
            currentUser: null,
            isFetching: false, 
            error: false,
            errorMessage: null,
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
        updateUserSuccess: (state, action) => {
            if (state.user.allUsers) {
                state.user.allUsers = state.user.allUsers.map(user =>
                    user._id === action.payload._id ? action.payload : user
                );
            }
            if (state.user.currentUser?._id === action.payload._id) {
                state.user.currentUser = action.payload; 
            }
        },
        updateUserFailed: (state, action) => {
            state.user.isFetching = false;  // Thêm để đặt trạng thái fetching về false
            state.user.error = true;
            state.user.errorMessage = action.payload;  // Lưu thông tin lỗi nếu cần
            console.error("Cập nhật không thành công:", action.payload);
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    updateUserSuccess, 
    updateUserFailed
} = userSlice.actions;

export default userSlice.reducer;
