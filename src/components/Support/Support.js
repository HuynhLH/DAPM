import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import './Support.css'; 

const Support = () => {
    const navigate = useNavigate(); // Khởi tạo hàm navigate

    const handleBack = () => {
        navigate(-1); // Quay về trang trước đó
    };

    return (
        <div className="support-container">
            <h1>Hỗ trợ khách hàng</h1>

            <section className="faq-section">
                <h2>Câu hỏi thường gặp (FAQ)</h2>
                <ul className="faq-list">
                    <li>
                        <h3>Câu hỏi 1: Làm thế nào để đăng ký tài khoản?</h3>
                        <p>Để đăng ký tài khoản, bạn cần truy cập vào trang đăng ký và điền đầy đủ thông tin yêu cầu.</p>
                    </li>
                    <li>
                        <h3>Câu hỏi 2: Làm thế nào để khôi phục mật khẩu?</h3>
                        <p>Bạn có thể khôi phục mật khẩu bằng cách nhấn vào liên kết "Quên mật khẩu" trên trang đăng nhập.</p>
                    </li>
                    <li>
                        <h3>Câu hỏi 3: Có thể thay đổi thông tin tài khoản không?</h3>
                        <p>Có, bạn có thể thay đổi thông tin tài khoản trong phần cài đặt tài khoản của mình.</p>
                    </li>
                </ul>
            </section>

            <section className="info-section">
                <h2>Thông tin hỗ trợ</h2>
                <p>Nếu bạn cần thêm hỗ trợ, vui lòng liên hệ với chúng tôi qua thông tin dưới đây:</p>
                <ul>
                    <li>Email: support@example.com</li>
                    <li>Điện thoại: (077) 638-3637</li>
                    <li>Giờ làm việc: 9:00 AM - 5:00 PM (Thứ Hai - Thứ Sáu)</li>
                </ul>
            </section>

            <section className="image-section">
                <h2>Hình ảnh hỗ trợ</h2>
                <img src={`${process.env.PUBLIC_URL}/images/HINH1.jpg`} alt="Hình ảnh hỗ trợ" className="support-image" />
            </section>

            {/* Nút Quay về */}
            <button className="back-button" onClick={handleBack}>
                Quay về
            </button>
        </div>
    );
};

export default Support;
