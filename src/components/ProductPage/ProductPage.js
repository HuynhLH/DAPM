import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice'; 
import { fetchCategories } from '../../redux/categorySlice'; 
import './ProductPage.css';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = useSelector(state => state.auth.login.currentUser);
    const { products, status, error } = useSelector((state) => state.products);
    const { categories } = useSelector(state => state.categories);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); 

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('search');
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [location.search]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
            dispatch(fetchCategories()); 
        }
    }, [status, dispatch]);

    const handleAddToCart = (product) => {
      if (currentUser) {
          dispatch(addToCart(product));
          alert(`${product.name} đã được thêm vào giỏ hàng!`);
      } else {
          alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
      }
    };
    
    const filteredProducts = products.filter(product => {
        const price = parseFloat(product.price);
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        const withinPriceRange = (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
        const matchesSearchTerm = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true; 
        return withinPriceRange && matchesSearchTerm && matchesCategory;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'lowToHigh') {
            return a.price - b.price;
        } else if (sortOrder === 'highToLow') {
            return b.price - a.price;
        } else if (sortOrder === 'bestSeller') {
            return b.sales - a.sales; 
        }
        return 0;
    });

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); 
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`, { state: { productData: product } });
    };

    return (
        <div className="product-page">
            <h1 className="product-page-title">Sản phẩm nổi bật</h1>
            {status === 'loading' && <p className="loading-message">Đang tải sản phẩm...</p>}
            {error && <p className="error-message">Lỗi: {error}</p>}

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="search-button" onClick={() => navigate(`/productpage?search=${searchTerm}`)}>
                    Tìm
                </button>
            </div>

            <div className="category-filter">
                <label>Chọn thể loại:</label>
                <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
                    <option value="">Tất cả</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="price-filter">
                <input
                    type="number"
                    placeholder="Giá thấp"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="price-input"
                />
                <input
                    type="number"
                    placeholder="Giá cao"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="price-input"
                />
            </div>

            <div className="sort-options">
                <label>Sắp xếp theo:</label>
                <select value={sortOrder} onChange={handleSortChange} className="sort-select">
                    <option value="">Mặc định</option>
                    <option value="lowToHigh">Giá thấp đến cao</option>
                    <option value="highToLow">Giá cao đến thấp</option>
                    <option value="bestSeller">Bán chạy nhất</option>
                </select>
            </div>

            <div className="product-grid">
                {sortedProducts.map((product) => (
                    <div className="product-card" key={product._id} onClick={() => handleProductClick(product)}>
                        <img src={product.image_url} alt={product.Name} className="product-image" />
                        <h2 className="product-name2">{product.Name}</h2>
                        <p className="product-price">{product.price} ₫</p>
                        <button className="add-to-cart-button1" onClick={(e) => {
                            e.stopPropagation(); 
                            handleAddToCart(product); 
                        }}>Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
