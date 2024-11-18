import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { addViewedProduct } from '../../redux/viewedProductsSlice';
import ReviewForm from '../ReviewForm/ReviewForm';
import './ProductDetail.css';

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state?.productData;
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
      };

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
    const goBack =()=> {
        navigate(-1);
    }

    const handleAddToCart = () => {
        if (!currentUser) {
            alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }
        const { _id } = currentUser; 
        const { _id: productId, dealId,price,image_url,name,Name,quantity = 1 } = product; 
        dispatch(addToCart({ id: productId, dealId, quantity,price,name,Name,image_url }));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };
   
    if (!product) {
        return <p>Không tìm thấy thông tin sản phẩm.</p>;
      }
  

    return (
        <div className="product-detail">
        <button onClick={goBack} className='product-detail-goback'>Quay về</button>
            <div className="product-detail-container">
                <div className="product-image-container">
                    <img src={product.image_url} alt={product.Name} className="product-detail-image" />
                </div>
                <div className="product-info">
                    <h1 className="product-name">{product.Name} {product.name}</h1>
                    <p className="product-price">Giá: {product.price.toLocaleString('vi-VN')} VND</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-actions">
                        <button className="buy-now-button" >Mua ngay</button>
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
                <ReviewForm productId={product._id} />
            </div>
        </div>
    );
};

export default ProductDetail;
