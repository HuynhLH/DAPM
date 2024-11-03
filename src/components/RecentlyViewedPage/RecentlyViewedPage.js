import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeViewedProduct } from '../../redux/viewedProductsSlice'; 
import './RecentlyViewedPage.css';

const RecentlyViewedPage = () => {
    const dispatch = useDispatch();
    const viewedProducts = useSelector(state => state.viewedProducts.viewedProducts);

    const handleRemoveProduct = (productId) => {
        dispatch(removeViewedProduct(productId)); 
    };

    if (viewedProducts.length === 0) {
        return <p>Bạn chưa xem sản phẩm nào.</p>;
    }

    return (
        <div className="recently-viewed-page">
            <h2>Các sản phẩm đã xem</h2>
            <div className="viewed-products-list">
                {viewedProducts.map((product) => (
                    <div key={product._id} className="viewed-product-item">
                        <Link to={{ pathname: `/product/${product._id}`, state: { productData: product } }}>
                            <img src={product.image_url} alt={product.name} />
                            <h3>{product.name}</h3>
                        </Link>
                        <button 
                            className="delete-button" 
                            onClick={() => handleRemoveProduct(product._id)}
                        >
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedPage;
