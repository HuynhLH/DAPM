import react from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Order.css";
import { useNavigate } from "react-router-dom";

const Order =() =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="orderproduct">
            <div className="order-container">
                <div className="input-order">
                    <label className="order-username">Nhập họ và tên</label>
                </div>
                <div className="input-order">
                    <label className="order-adresss">nhập địa chỉ</label>
                </div>
                <div className="input-order">
                    <label className="order-SDT">Nhập số điện thoại</label>
                </div>
            </div>
        </div>
    );
};
export default Order;