import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { 
  createShippingAddress, 
  updateShippingAddress, 
  deleteShippingAddress, 
  getShippingAddresses 
} from '../../redux/shippingSlice';
import { cityData } from '../CITYDATA/CityData'; 
import './ShippingForm.css'; 

const ShippingAddressForm = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const user = useSelector((state) => state.auth?.login?.currentUser  );
  const shippingAddresses = useSelector((state) => state.shippingAddress?.shippingAddresses || []);
  const loading = useSelector((state) => state.shippingAddress?.loading);
  const error = useSelector((state) => state.shippingAddress?.error);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (user) {
      dispatch(getShippingAddresses(user._id));
    }
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
        alert('Please log in first!');
        return;
    }

    if (!address || !city || !district || !ward || !phoneNumber) {
        alert('All fields are required');
        return;
    }

    const newAddress = {
        id: isEditing ? selectedAddress.id : new Date().getTime().toString(),
        user: user._id,
        address,
        city,
        district,
        ward,
        phoneNumber,
    };

    if (isEditing) {
        dispatch(updateShippingAddress(newAddress)).then(() => {
            resetForm();
        });
    } else {
      dispatch(createShippingAddress(newAddress)).then(() => {
        navigate('/order', { state: { cartItems, shippingAddresses: newAddress } });
        resetForm();
    });
    }
};
  const handleEdit = (address) => {
    setAddress(address.address);
    setCity(address.city);
    setDistrict(address.district);
    setWard(address.ward);
    setPhoneNumber(address.phoneNumber);
    setIsEditing(true);
    setSelectedAddress(address);
  };

  const handleDelete = async (addressId) => {
    if (addressId) {
      await dispatch(deleteShippingAddress(addressId));
      await dispatch(getShippingAddresses(user._id));
    } else {
      console.log("Invalid ID");
    }
  };

  const resetForm = () => {
    setAddress('');
    setCity('');
    setDistrict('');
    setWard('');
    setPhoneNumber('');
    setIsEditing(false);
    setSelectedAddress(null);
  };

  return (
    <div className="shipping-form-container">
      {error && <div className="error-message">{error}</div>}

      <form className="shipping-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Update Shipping Address' : 'Add Shipping Address'}</h2>

        <div className="input-group">
          <label>Địa Chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street Address"
          />
        </div>

        <div className="input-group">
          <label>Thành Phố</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Chọn thành phố</option>
            {cityData.map((cityItem) => (
              <option key={cityItem.name} value={cityItem.name}>{cityItem.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Quận/Huyện</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!city}>
            <option value="">Chọn quận/huyện</option>
            {city && cityData.find(item => item.name === city)?.districts.map(districtItem => (
              <option key={districtItem.name} value={districtItem.name}>{districtItem.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Phường/Xã</label>
          <select value={ward} onChange={(e) => setWard(e.target.value)} disabled={!district}>
            <option value="">Chọn phường/xã</option>
            {district && cityData.find(item => item.name === city)?.districts.find(item => item.name === district)?.wards.map(wardItem => (
              <option key={wardItem} value={wardItem}>{wardItem}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Số Điện Thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone"
          />
        </div>

        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Address' : 'Add Address'}
        </button>
      </form>

      <div className="saved-addresses">
        <h3>Danh sách thông tin</h3>
        <div className="addresses-list">
          {shippingAddresses.map((address) => (
            <div key={address._id} className="address-card">
              <p>
                {`${address.address}, ${address.city}, ${address.district}, ${address.ward}, ${address.phoneNumber}`}
              </p>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(address)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(address._id)}>
                  Delete
                </button>
                <button
                  className="navigate-order-btn"
                  onClick={() => navigate('/order', { state: { cartItems, address: address } })} // Truyền cả cartItems và address
                >
                  Đi đến trang Đơn Hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;