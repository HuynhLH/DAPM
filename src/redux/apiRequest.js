import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";

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
        throw error; 
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
        navigate("/login"); // Correctly navigate after logout
    } catch (err) {
        console.error("Logout failed:", err);
        dispatch(logOutFailed());
    }
}