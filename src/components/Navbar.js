// src/components/Navbar.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; 

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

    const sliderSettings = {
        dots: false, 
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false, 
        arrows: false 
    };
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
      };

    return (
        <div className="navbar">
            <div className="promotions1">
                <h2 className='hhhh'>Khuyến mãi đặc biệt</h2>
                <Slider {...sliderSettings}>
                    <div className="promotion-slide">
                        <img src="https://media.hcdn.vn/hsk/1730345822homecn225226.jpg" alt="Quảng cáo 1" />
                    </div>
                    <div className="promotion-slide">
                        <img src="https://media.hcdn.vn/hsk/1730445579home-1111.png" alt="Quảng cáo 2" />
                    </div>
                    <div className="promotion-slide">
                        <img src="https://media.hcdn.vn/hsk/1712203188846x250-banner-home-web.jpg" alt="Quảng cáo 3" />
                    </div>
                </Slider>

                <div className="promotion-container">
                <Link to="/deals">
                    <div className="promotion-card">
                        <i className="fas fa-star"></i>
                        <h3>Hasaki Deal</h3>
                    </div>
                    </Link>
                    <Link to="/hotdeals">
                    <div className="promotion-card">
                        <i className="fas fa-clock"></i>
                        <h3>Hot Deal</h3>
                    </div>
                    </Link>
                    <Link to="/produtcpage">
                    <div className="promotion-card">
                        <i className="fas fa-spray-can-sparkles"></i>
                        <h3>Sản Phẩm</h3>
                    </div>
                    </Link>
                    <div className="promotion-card">
                        <i className="fas fa-gift"></i>
                        <h3>Đơn Hàng của Bạn</h3>
                    </div>
                    <Link to="/guide">
                        <div className="promotion-card">
                            <i className="fas fa-book"></i>
                            <h3>Cẩm nang</h3>
                        </div>
                    </Link>
                    <Link to="/recentlyviewpage">
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
                                        <h3 className="product-name1">{product.Name}</h3>
                                        <div className="product-pricing">
                                            <span className="product-price">Giá: {product.price.toLocaleString('vi-VN')} VND</span>
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
