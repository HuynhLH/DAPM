import React from 'react';
import './Footer.css'; // Ensure you have the CSS file imported

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <h4>Giới thiệu</h4>
                    <a href="/about">Về chúng tôi</a>
                    <a href="/contact">Liên hệ</a>
                    <a href="/careers">Công việc</a>
                </div>
                <div className="footer-links">
                    <h4>Khách hàng</h4>
                    <a href="/support">Hỗ trợ khách hàng</a>
                    <a href="/faq">Câu hỏi thường gặp</a>
                    <a href="/returns">Chính sách đổi trả</a>
                </div>
                <div className="footer-links">
                    <h4>Thông tin</h4>
                    <a href="/terms">Điều khoản dịch vụ</a>
                    <a href="/privacy">Chính sách bảo mật</a>
                </div>
                <div className="footer-links">
                    <h4>Liên hệ</h4>
                    <p>Email: info@hasaki.vn</p>
                    <p>Điện thoại: +84 077 638 3637</p>
                    <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
                </div>
                <div className="footer-social">
                    <h4>Theo dõi chúng tôi</h4>
                    <a href="https://www.facebook.com/Hasaki.vn/?locale=vi_VN" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/hasakibeauty/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
            <div className="newsletter">
                <h4>Đăng ký nhận tin</h4>
                <input type="email" placeholder="Nhập email của bạn" />
                <button>Đăng ký</button>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 HASAKI.vn. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;