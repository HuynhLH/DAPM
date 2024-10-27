import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/get');
                console.log(response.data); 
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const price = parseFloat(product.price);
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        const withinPriceRange = (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
        return withinPriceRange;
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

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="product-page">
            <h1 className="product-page-title">Sản phẩm nổi bật</h1>
            {loading && <p className="loading-message">Đang tải sản phẩm...</p>}
            {error && <p className="error-message">Lỗi: {error}</p>}
            <div className="price-filter">
                <input
                    type="number"
                    placeholder="Giá thấp"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Giá cao"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Sắp xếp sản phẩm */}
            <div className="sort-options">
                <label>Sắp xếp theo:</label>
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="">Mặc định</option>
                    <option value="lowToHigh">Giá thấp đến cao</option>
                    <option value="highToLow">Giá cao đến thấp</option>
                    <option value="bestSeller">Bán chạy nhất</option>
                </select>
            </div>

            <div className="product-grid">
                {sortedProducts.map((product) => (
                    <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
                        <img src={product.image_url} alt={product.Name} className="product-image" />
                        <h2 className="product-name">{product.Name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">{product.price} ₫</p>
                        <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
