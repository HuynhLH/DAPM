import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromLocalStorage(),
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            state.total += action.payload.price; 
            localStorage.setItem('cart', JSON.stringify(state.items)); 
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.total -= state.items[index].price; 
                state.items.splice(index, 1); 
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
            state.total = payload.reduce((total, item) => total + item.price, 0); 
        }        
    },
});

export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
