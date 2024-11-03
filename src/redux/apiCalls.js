import axios from "axios"; 
import { updateUserSuccess, updateUserFailed } from "./userSlice"; 

export const updateUser = async (id, userData, dispatch, accessToken) => {
    try {
        const res = await axios.put(`http://localhost:5000/v1/user/users/${id}`, userData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        
        if (res.data) {
            dispatch(updateUserSuccess(res.data)); 
            localStorage.setItem('currentUser', JSON.stringify(res.data)); 
            alert("Cập nhật thành công!");
        } else {
            throw new Error("Dữ liệu trả về không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error.response ? error.response.data : error.message);
        dispatch(updateUserFailed(error.message));
    }
};
