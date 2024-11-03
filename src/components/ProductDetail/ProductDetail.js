import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { addViewedProduct } from '../../redux/viewedProductsSlice';
import ReviewForm from '../ReviewForm/ReviewForm';
import ReviewList from '../ReviewForm/ReviewList';
import './ProductDetail.css';

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state?.productData;
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (product) {
            dispatch(addViewedProduct(product));
        }
    }, [product, dispatch]);

    if (!product) {
        return <p>Không tìm thấy thông tin sản phẩm.</p>;
    }

    const handleAddToCart = () => {
        if (!currentUser) {
            alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }

        dispatch(addToCart(product));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                <div className="product-image-container">
                    <img src={product.image_url} alt={product.Name} className="product-detail-image" />
                </div>
                <div className="product-info">
                    <h1 className="product-name">{product.Name} {product.name}</h1>
                    <p className="product-price">{product.price} ₫</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-availability">
                        <p>Tình trạng: <span>{product.stock > 0 ? "Còn hàng" : "Hết hàng"}</span></p>
                        <p>Đã bán: {product.sales || 0}</p>
                    </div>

                    <div className="product-actions">
                        <button className="buy-now-button">Mua ngay</button>
                        <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                    </div>

                    <div className="product-details">
                        <h3>Chi tiết sản phẩm:</h3>
                        <ul>
                            <li>Thương hiệu: {product.brand?.name || product.brand || "Không có"}</li>
                            <li>Loại Sản Phẩm: {typeof product.category === 'string' ? product.category : product.category?.name || "Không có"}</li>
                            <li>Kích thước: {product.sizes || "Chưa có"}</li>
                            <li>Màu sắc: {product.colors || "Chưa có"}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="product-reviews">
                <h3>Đánh giá sản phẩm</h3>
                <ReviewForm productId={product._id} />
                <ReviewList productId={product._id} />
            </div>
        </div>
    );
};

export default ProductDetail;
