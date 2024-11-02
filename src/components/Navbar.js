import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts()); 
    }, [dispatch]);
    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`, { state: { productData: product } });
    };
    const featuredProducts = products.filter(product => product.isFeatured);

    return (
        <div className="navbar">
            <div className="promotions">
                <h2>Khuyến mãi đặc biệt</h2>
                <div className="promotion-container">
                    <div className="promotion-card">
                        <i className="fas fa-star"></i>
                        <h3>Bán chạy</h3>
                    </div>
                    <div className="promotion-card">
                        <i className="fas fa-clock"></i>
                        <h3>Giao 2h</h3>
                    </div>
                    <div className="promotion-card">
                        <i className="fas fa-spray-can-sparkles"></i>
                        <h3>Nước hoa chính hãng</h3>
                    </div>
                    <div className="promotion-card">
                        <i className="fas fa-gift"></i>
                        <h3>Mua là có quà</h3>
                    </div>
                    <div className="promotion-card">
                        <i className="fas fa-book"></i>
                        <h3>Cẩm nang</h3>
                    </div>
                    <Link to="/recentlyViewe">
                    <div className="promotion-card">
                        <i className="fas fa-eye"></i>
                        <h3>Đã xem</h3>
                    </div>
                    </Link>
                </div>

                <div className="products-container">
                    <h2>Sản phẩm nổi bật</h2>
                    <div className="products-grid">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product) => (
                                <div className="product-card" key={product._id} onClick={() => handleProductClick(product)}>
                                    <img src={product.image_url} alt={product.Name} className="product-image" />
                                    <div className="product-info">
                                        <h3 className="product-name">{product.Name}</h3>
                                        <div className="product-pricing">
                                            <span className="product-price">{product.price} ₫</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-featured-products">Không có sản phẩm nổi bật nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
