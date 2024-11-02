// Helper để lấy và lưu giỏ hàng vào localStorage
export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
};
