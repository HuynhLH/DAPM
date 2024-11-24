import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";
import { deleteUserFailed, deleteUserStart, deleteUserSuccess } from "./userSlicedelete";

export const loginUser = async(user,dispatch,navigate) =>{
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:5000/v1/auth/login",user);
        dispatch(loginSuccess(res.data));
        if (res.data.admin) { 
            navigate("/admin");  
        } else {
            navigate("/");  
        }
    } catch (error) {
        dispatch(loginFailed());
    }
}
export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:5000/v1/auth/register",user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
}
export const logOut = async(dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("http://localhost:5000/v1/auth/logout", { id }, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(logOutSuccess());
        navigate("/login"); 
    } catch (err) {
        console.error("Logout failed:", err);
        dispatch(logOutFailed());
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("http://localhost:5000/v1/user/", {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        console.error("Lỗi khi tải danh sách người dùng:", error.response ? error.response.data : error.message);
        dispatch(getUsersFailed());
    }
};
export const deleteUser = async (id, accessToken, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete(`http://localhost:5000/v1/user/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUserSuccess());
        await getAllUsers(accessToken, dispatch);
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error.response ? error.response.data : error.message);
        dispatch(deleteUserFailed());
    }
};




