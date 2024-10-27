// UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../../redux/apiRequest';
import './UserList.css'; 

const UserList = () => {
    const dispatch = useDispatch();
    const { allUsers, isFetching, error } = useSelector((state) => state.users.user);
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;

    useEffect(() => {
        if (accessToken) {
            getAllUsers(accessToken, dispatch).catch((error) => {
                console.error("Error fetching users:", error);
            });
        }
    }, [accessToken, dispatch]);

    const handleDelete = (userId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            deleteUser(userId, accessToken, dispatch);
        }
    };

    if (isFetching) return <div className="loading">Đang tải danh sách người dùng...</div>;
    if (error) return <div className="error">Đã xảy ra lỗi khi tải danh sách người dùng.</div>;

    return (
        <div className="user-list-container">
            <h2 className="title">Danh sách người dùng</h2>
            {allUsers && allUsers.length === 0 ? (
                <div className="no-users">Không có người dùng nào.</div>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers && allUsers.map(user => (
                            <tr key={user._id} className="user-row">
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? 'Admin' : 'Người dùng'}</td>
                                <td>
                                    {!user.admin && (
                                        <button className="delete-button" onClick={() => handleDelete(user._id)}>Xóa</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
