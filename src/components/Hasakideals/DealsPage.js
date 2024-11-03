import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeals } from '../../redux/dealSlice';
import { fetchCategories } from '../../redux/categorySlice'; 
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import './DealsPage.css';

const DealsPage = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { deals, loading, error } = useSelector((state) => state.deals);
    const { categories } = useSelector((state) => state.categories); 
    const currentUser = useSelector(state => state.auth.login.currentUser);

    useEffect(() => {
        dispatch(fetchDeals());
        dispatch(fetchCategories()); 
    }, [dispatch]);

    const handleAddToCart = (deal) => {
        if (currentUser) {
            dispatch(addToCart(deal));
            alert(`${deal.name} đã được thêm vào giỏ hàng!`);
        } else {
            alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
        }
    };

    const filteredDeals = deals.filter(deal => {
        const price = parseFloat(deal.price) || 0;
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        const matchesSearchTerm = deal.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? deal.category._id === selectedCategory : true; // Match category
        return (isNaN(min) || price >= min) && (isNaN(max) || price <= max) && matchesSearchTerm && matchesCategory;
    });
    
    const sortedDeals = filteredDeals.sort((a, b) => {
        if (sortOrder === 'lowToHigh') return (a.price || 0) - (b.price || 0);
        if (sortOrder === 'highToLow') return (b.price || 0) - (a.price || 0);
        if (sortOrder === 'bestSeller') return (b.sales || 0) - (a.sales || 0);
        return 0;
    });

    const handleSortChange = (e) => setSortOrder(e.target.value);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    const handleDealClick = (deal) => {
        navigate(`/product/${deal._id}`, { state: { productData: deal } });
    };

    return (
        <div className="deals-page">
            <h1 className='huynh'>Các sản phẩm</h1>
            <div className="product-page">
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" onClick={() => {  }}>
                        Tìm
                    </button>
                </div>

                <div className="category-filter">
                    <label>Thể loại:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
                    />
                    <input
                        type="number"
                        placeholder="Giá cao"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                <div className="sort-options">
                    <label>Sắp xếp theo:</label>
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="">Mặc định</option>
                        <option value="lowToHigh">Giá thấp đến cao</option>
                        <option value="highToLow">Giá cao đến thấp</option>
                        <option value="bestSeller">Bán chạy nhất</option>
                    </select>
                </div>

                {/* Deals Container */}
                <div className="deals-container">
                    {sortedDeals.map(deal => (
                        <div className="deal-card" key={deal._id} onClick={() => handleDealClick(deal)}>
                            <img src={deal.image_url} alt={deal.name} className="deal-image" />
                            <h3 className="deal-name">{deal.name}</h3>
                            <p className="deal-price">{deal.price} ₫</p>
                            <p className="deal-discount">Giảm giá: {deal.discount || 0} %</p>
                            <p className="deal-status">Tình trạng: {deal.isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}</p>
                            <button 
                                className="deal-button" 
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    handleAddToCart(deal); 
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealsPage;
