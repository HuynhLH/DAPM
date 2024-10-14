import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';


const Navbar = () => {
    const products = [
        {
            id: 1,
            name: 'Nước Hoa Hồng Klairs',
            price: '204.000 ₫',
            oldPrice: '435.000 ₫',
            image: 'nuohoahong.jpg',
            discount: '53%',
        },
        {
            id: 2,
            name: 'Nước Tẩy Trang Bioderma',
            price: '153.000 ₫',
            oldPrice: '229.000 ₫',
            image: 'nuoctaytrang.png',
            discount: '33%',
        },
        {
            id: 3,
            name: 'Kem Chống Nắng Skin1004',
            price: '214.000 ₫',
            oldPrice: '425.000 ₫',
            image: 'kemchongnang.png',
            discount: '50%',
        },
        {
            id: 4,
            name: 'Kem Chống Nắng La Roche-Posay',
            price: '330.000 ₫',
            oldPrice: '560.000 ₫',
            image: 'kemchongnag1.jpg',
            discount: '41%',
        },
        {
            id: 5,
            name: 'Nước Tẩy Trang L’Oreal',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'download.jpg',
            discount: '33%',
        },
        {
            id: 6,
            name: 'Tẩy da chết cà phê daklak',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'taydachetcafe.png',
            discount: '33%',
        },
        {
            id: 7,
            name: 'Sữa rữa mặt Creave',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'creave.png',
            discount: '33%',
        },
        {
            id: 8,
            name: 'Sữa chống nắng anessa',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'anessa.png',
            discount: '33%',
        },
        {
            id: 9,
            name: 'Sữa rửa mặt Cetaphil',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'Cettaphil.png',
            discount: '33%',
        },
        {
            id: 10,
            name: 'BHA',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'bha.jpg',
            discount: '33%',
        },
        {
            id: 11,
            name: 'Son Dưỡng',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'sonduong.jpg',
            discount: '33%',
        },
        {
            id: 12,
            name: 'Kem dưỡng da',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'kemduongda.jpg',
            discount: '33%',
        },
        {
            id: 13,
            name: 'Serum',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'serum1.jpg',
            discount: '33%',
        },
        {
            id: 14,
            name: 'Serum Bright',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'serumbright.jpg',
            discount: '33%',
        },
        {
            id: 15,
            name: 'Serum Gariner',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'serumgarriner.jpg',
            discount: '33%',
        },
        {
            id: 16,
            name: 'Serum sáng da',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'serumsangda.jpg',
            discount: '33%',
        },
        {
            id: 17,
            name: 'Kem dưỡng Olay',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'kemduong.png',
            discount: '33%',
        },
        {
            id: 18,
            name: 'Lăn khử mùi EtiaXil',
            price: '353.000 ₫',
            oldPrice: '525.000 ₫',
            image: 'lankhumui.jpg',
            discount: '37%',
        },
    ];
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
                    <div className="promotion-card">
                        <i className="fas fa-eye"></i>
                        <h3>Đã xem</h3>
                    </div>
                </div>

                <div className="products-container">
                    <h2>Sản phẩm nổi bật</h2>
                    <div className="products-grid">
                        {products.map((product) => (
                            <div className="product-card" key={product.id}>
                                <img
                                    src={`/images/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-pricing">
                                        <span className="product-price">{product.price}</span>
                                        <span className="product-old-price">{product.oldPrice}</span>
                                    </div>
                                    <span className="product-discount">{product.discount} giảm</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;