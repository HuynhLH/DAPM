import React, { useRef, useState, useEffect } from 'react';
import './FlashDeals.css';

const FlashDeals = () => {
    const initialProducts = [
        { id: 1, name: 'Nước Hoa Hồng Klairs', price: '204.000 ₫', image: 'nuohoahong.jpg' },
        { id: 2, name: 'Nước Tẩy Trang Bioderma', price: '153.000 ₫', image: 'nuoctaytrang.png' },
        { id: 3, name: 'Kem Chống Nắng Skin1004', price: '214.000 ₫', image: 'kemchongnang.png' },
        { id: 4, name: 'Kem Dưỡng Da', price: '156.000 ₫', image: 'kemduongda.jpg' },
        { id: 5, name: 'Serum garriner', price: '180.000 ₫', image: 'serumgarriner.jpg' },
        { id: 6, name: 'Serum Vitamin C', price: '299.000 ₫', image: 'serumbright.jpg' },
        { id: 7, name: 'Tẩy da chết cafe', price: '50.000 ₫', image: 'taydachetcafe.png' },
        { id: 8, name: 'Son dưỡng', price: '290.000 ₫', image: 'sonduong.jpg' },
    ];

    const alternateProducts = [
        { id: 1, name: 'Kem Chống Nắng La Roche-Posay', price: '330.000 ₫', image: 'kemchongnag1.jpg' },
        { id: 2, name: 'Nước Tẩy Trang L’Oreal', price: '353.000 ₫', image: 'download.jpg' },
        { id: 3, name: 'Serum tốt nhất', price: '353.000 ₫', image: 'serum1.jpg' },
        { id: 4, name: 'Nước tẩy trang', price: '299.000 ₫', image: 'nuoctaytrang.png' },
        { id: 5, name: 'Lăn khử mùi', price: '450.000 ₫', image: 'lankhumui.jpg' },
        { id: 6, name: 'Sữa Rửa Mặt Cetaphil', price: '280.000 ₫', image: 'Cettaphil.png' },
        { id: 7, name: 'Sữa Rửa Mặt CREAVE', price: '70.000 ₫', image: 'creave.png' },
        { id: 8, name: 'Serum Hyaluronic Acid', price: '360.000 ₫', image: 'serumsangda.jpg' },
    ];

    const scrollRef = useRef(null);
    const [products, setProducts] = useState(initialProducts);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 300; // Change this to adjust how far to scroll
        console.log(`Scrolling ${direction}`); // Log to check if the button works
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Change products when timer hits zero
                    setProducts((prevProducts) =>
                        prevProducts === initialProducts ? alternateProducts : initialProducts
                    );
                    return 3600; // Reset to 1 hour
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [initialProducts, alternateProducts]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')} : `;
    };

    return (
        <div className="flash-deals-container">
            <h2>Flash Deals</h2>
            <div className="countdown-timer">
                <span>Thời gian còn lại: {formatTime(timeLeft)}</span>
            </div>
            <div className="flash-deals">
                <button className="scroll-button left" onClick={() => scroll('left')}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="flash-deals-products" ref={scrollRef}>
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img
                                src={`/images/${product.image}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <span className="product-price">{product.price}</span>
                            </div>
                            
                        </div>
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => scroll('right')}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );    
};

export default FlashDeals;
