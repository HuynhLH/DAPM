// src/components/Guide.js
import React from 'react';
import './Guide.css';

const Guide = () => {
    return (
        <div className="guide">
            <h1 className='kkh'>Cẩm Nang Thông Minh</h1>
            
            {/* Phần Video */}
            <section className="video-section">
                <h2>Video Hướng Dẫn</h2>
                <div className="video-container">
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/4bEfvxR8Fy4?autoplay=0&controls=1" // Thêm autoplay=0 để không tự động phát
                        title="Video Hướng Dẫn"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            {/* Phần Quảng Cáo */}
            <section className="advertisements">
                <h2 className='kkk'>Quảng Cáo</h2>
                <div className="ad-banner">
                    <img src="https://media.hcdn.vn/hsk/1730457566homedove111.jpg" alt="Quảng cáo 1" />
                    <p>Khám phá sản phẩm A mới nhất của chúng tôi!</p>
                </div>
                <div className="ad-banner">
                    <img src="https://media.hcdn.vn/hsk/1730429435homechilly111.jpg" alt="Quảng cáo 2" />
                    <p>Giảm giá đặc biệt cho sản phẩm B!</p>
                </div>
                <div className="ad-banner">
                    <img src="https://media.hcdn.vn/hsk/1711100177web.jpg" alt="Quảng cáo 3" />
                    <p>Tham gia chương trình khuyến mãi ngày hôm nay!</p>
                </div>
            </section>

            {/* Phần Mẹo Chăm Sóc */}
            <section className="tips-section">
                <h2>Mẹo Chăm Sóc</h2>
                <p>Dưới đây là một số mẹo chăm sóc sản phẩm hiệu quả:</p>
                <ul>
                    <li>Mẹo 1: Đắp cà chua trực tiếp lên mặt đang trở thành một xu hướng 
                    chăm sóc da tự nhiên ngày càng phổ biến. Tuy nhiên, liệu phương pháp
                     này có đem lại lợi ích thực sự cho làn da của bạn hay không? Trong 
                     bài viết này, chúng ta sẽ khám phá cách đắp cà chua trực tiếp lên 
                     mặt có thể mang lại cho bạn làn da khỏe mạnh và rạng rỡ.</li>
                    <li>Mẹo 2: Việc xác định loại da là vô cùng quan trọng trong quá trình
                     chăm sóc da, sẽ giúp bạn lựa chọn sản phẩm dưỡng da phù hợp làm tăng 
                     hiệu quả dưỡng da. Tham khảo bài viết về cách nhận biết da khô và 1 
                     số mẹo cải thiện cho da khô. </li>
                    <li>Mẹo 3: Vitamin E thường có trong thành phần mỹ phẩm giúp hỗ trợ 
                    chăm sóc da, vitamin E giúp ngăn ngừa các vết thâm nám, ngăn ngừa 
                    hóa tình lão hóa da. Vậy Vitamin E nào tốt cho da mặt? Xem ngay bài
                     viết dưới đây nhé!</li>
                </ul>
            </section>

            {/* Danh Mục Chọn Cẩm Nang Chăm Sóc */}
            <section className="category-section">
                <h2>Danh Mục Cẩm Nang Chăm Sóc</h2>
                <ul className="category-list">
                    <li><h3>Có Nên Đắp Cà Chua Trực Tiếp Lên Mặt Không?</h3></li>
                    <li><h3>Cách Nhận Biết Da Khô Và 1 Số Mẹo Cải Thiện Cho Làn Da Khô?</h3></li>
                    <li><h3>Vitamin E Là Gì? Vitamin E Nào Tốt Cho Da Mặt?</h3></li>
                </ul>

                <div id="product-a" className="product-guide">
                    <h3>Có Nên Đắp Cà Chua Trực Tiếp Lên Mặt Không?</h3>
                    <p>1. Lợi ích của cà chua đối với da
                    Cà chua không chỉ là một nguyên liệu thơm ngon trong những
                     bữa ăn hàng ngày mà còn là một có rất nhiều lợi ích cho làn
                      da. Với chứa lượng lớn vitamin, khoáng chất và các hợp chất 
                      chống ô nhiễm, cà chua đã chứng minh là một nguồn dưỡng chất 
                      quý giá giúp cải thiện và bảo vệ làn da. Giúp ngăn chặn tổn
                       thương do tác động của tia UV, trong đó vitamin A giúp tăng
                        cường sự đàn hồi của da và ngăn chặn sự hình thành nếp nhăn.
                         Cà chua chứa nước lớn, giúp cung cấp độ ẩm cho làn da và làm 
                         dịu da khô, nứt nẻ. Đồng thời, các khoáng chất như kali và natri 
                         có trong cà chua giúp duy trì sự cân bằng nước, làm cho làn da
                          trở nên mềm mại mịn màng. Việc thường xuyên sử dụng cà chua để
                           làm đẹp cho da có thể giúp kiểm soát tình trạng da dầu, làm 
                           se lỗ chân lông và ngăn chặn sự hình thành mụn. </p>
                    <img src='https://media.hasaki.vn/hsk/dap-ca-chua-truc-tiep-len-mat-co-tot-khong.jpg' alt='ảnh cà chua'/>
                    <p>2. Có nên đắp cà chua trực tiếp lên mặt không?
                    Cà chua dồi dào vitamin C, A, và K, các chất chống ô nhiễm và chống oxy hóa. 
                    Việc áp dụng cà chua trực tiếp lên mặt giúp cung cấp dưỡng chất thiết yếu, 
                    tăng cường độ ẩm và tái tạo tế bào da. Và trong thành phần cà chua còn có 
                    chứa axit salicylic tự nhiên, giúp làm sáng da, giảm tình trạng mụn đen và 
                    mụn đỏ. Ngoài ra, nó còn có khả năng kiểm soát tình trạng da dầu và làm se 
                    lỗ chân lông. Với khả năng chống nắng tự nhiên đắp mặt nạ cà chua có thể
                     giúp bảo vệ làn da khỏi tác động có hại của tia UV, giảm nguy cơ tổn 
                     thương da do ánh sáng mặt trời. Khi đắp cà chua trực tiếp lên da mặt 
                     sẽ giúp loại bỏ các tế bào chết dịu nhẹ, không gây rát da như các sản 
                     phẩm tẩy tế bào chết khác. Ngoài ra cà chua còn có công dụng hỗ trợ sản
                      sinh collagen và giúp da đàn hồi, săn chắc hơn. Tóm lại với những công
                       dụng tuyệt vời như vậy, thì chúng ta hoàn toàn nên đắp cà chua trực tiếp lên mặt.
                       </p>
                       <img src='https://media.hasaki.vn/hsk/co-nen-dap-ca-chua-truc-tiep-len-mat.png' alt='cà chua'/>
                                            <p>Có Nên Đắp Cà Chua Trực Tiếp Lên Mặt Không?
                        ThủyPhạm Thị Ngọc- 2024-01-02 17:23:01

                        Đắp cà chua trực tiếp lên mặt đang trở thành một xu hướng chăm sóc da tự nhiên ngày càng phổ biến. Tuy nhiên, liệu phương pháp này có đem lại lợi ích thực sự cho làn da của bạn hay không? Trong bài viết này, chúng ta sẽ khám phá cách đắp cà chua trực tiếp lên mặt có thể mang lại cho bạn làn da khỏe mạnh và rạng rỡ.



                        274.000 ₫33%410.000 ₫La Roche-Posay
                        Kem Dưỡng La Roche-Posay Giúp Phục Hồi Da Đa Công Dụng 40ml
                        Cicaplast Baume B5+ Ultra-Repairing Soothing Balm
                        (21)   |    946
                        còn 
                        88%

                        303.000 ₫50%610.000 ₫Skin1004
                        Serum Skin1004 Rau Má Làm Dịu & Hỗ Trợ Phục Hồi Da 100ml
                        Madagascar Centella Ampoule
                        (88)   |    722
                        còn 
                        45%

                        95.000 ₫28%132.000 ₫Simple
                        Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml
                        Kind To Skin Refreshing Facial Wash Gel
                        (89)   |    1.849
                        còn 
                        45%

                        14.000 ₫44%25.000 ₫Nature Republic
                        Mặt Nạ Nature Republic Chiết Xuất Cà Chua Sáng Da 23ml
                        Real Nature Tomato Mask Sheet
                        (16)   |    409
                        còn 
                        45%
                        PreviousNext
                        Nội Dung Chính Bài Viết
                        1. Lợi ích của cà chua đối với da
                        2. Có nên đắp cà chua trực tiếp lên mặt không?
                        3. Những lưu ý khi đắp đắp cà chua trực tiếp lên mặt 
                        4. Các sản phẩm chăm sóc da dịu nhẹ
                        4.1 Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 
                        4.2 Serum Skin1004 Rau Má Giảm Mụn & Phục Hồi Da
                        4.3 Kem Dưỡng La Roche-Posay Giúp Phục Hồi Da
                        4.4 Mặt Nạ Nature Republic Chiết Xuất Cà Chua
                        1. Lợi ích của cà chua đối với da
                        Cà chua không chỉ là một nguyên liệu thơm ngon trong những bữa ăn hàng ngày mà còn là một có rất nhiều lợi ích cho làn da. Với chứa lượng lớn vitamin, khoáng chất và các hợp chất chống ô nhiễm, cà chua đã chứng minh là một nguồn dưỡng chất quý giá giúp cải thiện và bảo vệ làn da. Giúp ngăn chặn tổn thương do tác động của tia UV, trong đó vitamin A giúp tăng cường sự đàn hồi của da và ngăn chặn sự hình thành nếp nhăn. Cà chua chứa nước lớn, giúp cung cấp độ ẩm cho làn da và làm dịu da khô, nứt nẻ. Đồng thời, các khoáng chất như kali và natri có trong cà chua giúp duy trì sự cân bằng nước, làm cho làn da trở nên mềm mại mịn màng. Việc thường xuyên sử dụng cà chua để làm đẹp cho da có thể giúp kiểm soát tình trạng da dầu, làm se lỗ chân lông và ngăn chặn sự hình thành mụn. 

                        đắp cà chua trực tiếp lên mặt và lợi ích của cà chua

                        2. Có nên đắp cà chua trực tiếp lên mặt không?
                        Cà chua dồi dào vitamin C, A, và K, các chất chống ô nhiễm và chống oxy hóa. Việc áp dụng cà chua trực tiếp lên mặt giúp cung cấp dưỡng chất thiết yếu, tăng cường độ ẩm và tái tạo tế bào da. Và trong thành phần cà chua còn có chứa axit salicylic tự nhiên, giúp làm sáng da, giảm tình trạng mụn đen và mụn đỏ. Ngoài ra, nó còn có khả năng kiểm soát tình trạng da dầu và làm se lỗ chân lông. Với khả năng chống nắng tự nhiên đắp mặt nạ cà chua có thể giúp bảo vệ làn da khỏi tác động có hại của tia UV, giảm nguy cơ tổn thương da do ánh sáng mặt trời. Khi đắp cà chua trực tiếp lên da mặt sẽ giúp loại bỏ các tế bào chết dịu nhẹ, không gây rát da như các sản phẩm tẩy tế bào chết khác. Ngoài ra cà chua còn có công dụng hỗ trợ sản sinh collagen và giúp da đàn hồi, săn chắc hơn. Tóm lại với những công dụng tuyệt vời như vậy, thì chúng ta hoàn toàn nên đắp cà chua trực tiếp lên mặt.

                        có nên đắp cà chua trưc tiếp lên mặt không

                        Xem thêm: 7 Cách Làm Mặt Nạ Cà Chua Dưỡng Da Sáng Mịn

                        3. Những lưu ý khi đắp đắp cà chua trực tiếp lên mặt 
                        Vì đắp cà chua trực tiếp lên da nên bạn cần làm sạch cà chua để loại bỏ bụi bẩn hay thuốc trừ sâu có trong cà chua.
                        Trước khi áp dụng lên toàn bộ khuôn mặt, hãy dùng thử một lớp mỏng cà chua ở phía sau tai hoặc tay để đảm bảo rằng bạn không phản ứng dị ứng với cà chua.
                        Tránh áp dụng cà chua quá gần vùng mắt để tránh kích thích và đỏ mắt. Và người có làn da nhạy cảm có thể cần phải tìm hiểu cẩn thận hơn về các thành phần có trong cà chua, và nên tham khảo ý kiến của chuyên gia da liễu, để tránh gây kích ứng cho da. 
                        Không đắp mặt nạ cà chua cả tuần, chỉ sử dụng 2-3 lần mỗi tuần và mỗi lần chỉ đắp từ 15-20 phút, cuối cùng rửa sạch lại với nước ấm. </p>
                        <img src='https://media.hasaki.vn/hsk/luu-y-khi-dap-ca-chua-truc-tiep-len-mat.png' alt='haha'/>
                </div>

                <div id="product-b" className="product-guide">
                    <h3>Cách Nhận Biết Da Khô Và 1 Số Mẹo Cải Thiện Cho Làn Da Khô</h3>
                    <p>1. Cách nhận biết da khô
Da khô là tình trạng da thiếu ẩm và dầu, dẫn đến việc nó trở nên khó chịu, căng tróc, và có thể xuất hiện các vết nứt nhỏ. Một số dấu hiệu giúp nhận biết da khô:
Cảm giác khô căng da và khó chịu, da thường xuất hiện cảm giác khô ráp căng da gây khó chịu, và đặc biệt da khô hơn sau khi dùng sữa rửa mặt hoặc rửa mặt với nước nhiều. 
Da khô làm cho làn da bị bong tróc, nứt nẻ và trở nên đỏ đặc biệt là ở những khu vực nhạy cảm như mũi, mắt và miệng.
Người có làn da khô thường dễ bị kích ứng, dẫn đến tình trạng ngứa và nổi đỏ
Da bong tróc tróc xuất hiện các lớp vảy và tế bào chết, làm ảnh hưởng đến lớp nền khi trang điểm 
Da khô thường xuất hiện nếp nhăn nhanh hơn so với da khỏe mạnh, do thiếu dầu và độ ẩm.
Da khô thường mất đi sự rạng rỡ và mềm mại, da khô làm cho làn da bị thiếu nước dẫn đến da bị sạm tối màu. </p>

                <img src='https://media.hasaki.vn/hsk/cach-nhan-biet-da-kho.png' alt='hình ảnh 1'/>
                </div>

                <div id="product-c" className="product-guide">
                    <h3>Vitamin E Là Gì? Vitamin E Nào Tốt Cho Da Mặt</h3>
                    <p>1. Vitamin E là gì?
Vitamin E là một nhóm các chất chống oxy hóa, Vitamin E đóng vai trò quan trọng trong sức khỏe của cơ thể, và đặc biệt hỗ trợ chăm sóc da hiệu quả. Có 2 loại Vitamin E:

1.1 Vitamin E tự nhiên
Vitamin E tự nhiên là vitamin có trong thực phẩm như có trong dầu hạt cám và dầu hạt giống hướng dương, chúng là nguồn giàu vitamin E, có thể sử dụng chúng trong nấu ăn hoặc thêm vào salad. Và có trong một số loại hạt cũng là nguồn cung cấp tốt của vitamin E. Có trong các loại rau xanh có chứa rất nhiều vitamin E tốt cho da và sức khỏe cơ thể. 

Vitamin E có trong các loại quả như mâm xôi, dâu tây, dừa, cây lựu, lựu, hồng, kiwi giúp bổ sung dưỡng chất và vitamin làm đẹp da, hỗ trợ rút ngắn thời gian mang lại hiệu quả dưỡng da. Và vitamin E có nhiều trong các thực phẩm khác, và muốn đạt được hiệu quả dưỡng da tốt nhất, bạn cần kết hợp sử dụng các sản phẩm dưỡng da phù hợp.

1.2 Vitamin E tổng hợp
Vitamin E tổng hợp thường được sản xuất trong môi trường phòng thí nghiệm hoặc công nghiệp để sử dụng trong thực phẩm bổ sung và sản phẩm chăm sóc sức khỏe. Vitamin E tổng hợp cũng thường được thêm vào các sản phẩm chăm sóc da như kem dưỡng da, kem chống nắng, và các sản phẩm khác với mong muốn cung cấp chất chống oxy hóa và bảo vệ da khỏi tác động của tia tử ngoại và các gốc tự do. Vitamin E tổng hợp cũng có thể được thêm vào các sản phẩm chăm sóc tóc để cung cấp dưỡng chất và bảo vệ tóc khỏi các tác động gây hại từ môi trường.</p>
                <img src='https://media.hasaki.vn/hsk/vien-uong-dhc-bo-sung-vitamin-e-30-ngay-30-vien-2.jpg' alt='ảnh 2'/>
                </div>
            </section>
        </div>
    );
};

export default Guide;
