import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            state.total += action.payload.price; // Cộng dồn giá trị sản phẩm vào tổng
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.total -= state.items[index].price; // Trừ giá trị sản phẩm ra khỏi tổng
                state.items.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0; // Đặt lại tổng
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
