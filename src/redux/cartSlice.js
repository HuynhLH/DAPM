import { createSlice } from "@reduxjs/toolkit";

// Tải giỏ hàng từ localStorage khi ứng dụng khởi động
const loadCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error("Error loading cart from localStorage", e);
        return [];  // Nếu có lỗi, trả về giỏ hàng rỗng
    }
};


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromLocalStorage(), // Lấy giỏ hàng từ localStorage khi ứng dụng khởi động
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            // Cập nhật tổng tiền giỏ hàng
            state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            // Lưu giỏ hàng vào localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                const item = state.items[index];
                state.total -= item.price * item.quantity;
                state.items.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(state.items)); // Lưu lại giỏ hàng
            }
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
                localStorage.setItem('cart', JSON.stringify(state.items)); // Lưu lại giỏ hàng
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            localStorage.removeItem('cart'); 
        },
        loadCart: (state, action) => {
            const payload = action.payload || [];
            state.items = payload;
            state.total = payload.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    },
});

export const { addToCart, removeFromCart, clearCart, loadCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
