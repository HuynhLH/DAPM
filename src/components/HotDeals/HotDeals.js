import React from 'react';
import './HotDeals.css'; 

const HotDeals = () => {
  return (
    <div className="hotdeals-page">
      <div className="banner-row">
        <div className="banner-item">
          <img src="https://media.hcdn.vn/hsk/campaign/640x240-1729475636.jpg" alt="Deal Sốc 2K" />
          <p className='textlight'>Khai trương chi nhánh 221,222 - Cần Thơ,Đồng Nai </p>
        </div>
        <div className="banner-item">
          <img src="https://media.hcdn.vn/hsk/campaign/640x240mobilex-1729501762.jpg" alt="Deal Sốc 2K" />
          <p className='textlight'>Khai trương chi nhánh 223,224 - Hội An,TP.HCM</p>
        </div>
      </div>

      <div className="banner-row">
        <div className="banner-item">
          <img src="https://media.hcdn.vn/hsk/campaign/UnileverSIScovermobile640x2401700822403.png" alt="Sale Lượng Về" />
          <p className='textlight'>Unilever Nâng niu nét đẹp toan diện</p>
        </div>
        <div className="banner-item">
          <img src="https://media.hcdn.vn/hsk/campaign/Duocmypham640x2401685443000.jpg" alt="Ưu đãi Siêu Hạng" />
          <p className='textlight'>Dược mỹ phẩm - giải pháp cho mọi làn da</p>
        </div>
      </div>
      <div className="banner-row">
        <div className="banner-item">
          <img src="https://media.hcdn.vn/hsk/campaign/640x240---2021681784872.jpg" alt="Sale Lượng Về" />
          <p className='textlight'>Đại tiệc Treament - Chăm da chuyên sâu</p>
        </div>
        <div className="banner-item">
          <img src="https://media.hcdn.vn/hsk/campaign/640x240---1951711777663.jpg" alt="Ưu đãi Siêu Hạng" />
          <p className='textlight'>Hàng nhật đẹp nổi bật</p>
        </div>
      </div>
    </div>
  );
};

export default HotDeals;
