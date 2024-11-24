import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error("Lỗi khi tải giỏ hàng từ localStorage", e);
        return []; 
    }
};

// Cart slice definition
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromLocalStorage(), 
        total: 0, 
    },
    reducers: {
        // Add item to the cart
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                const item = state.items[index];
                state.total -= item.price * item.quantity;
                state.items.splice(index, 1); 
                localStorage.setItem('cart', JSON.stringify(state.items)); 
            }
        },

        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
                localStorage.setItem('cart', JSON.stringify(state.items));
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
        },
    },
});

export const { addToCart, removeFromCart, clearCart, loadCart, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
