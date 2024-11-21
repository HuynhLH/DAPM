import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createShippingAddress, 
  updateShippingAddress, 
  deleteShippingAddress, 
  getShippingAddresses 
} from '../../redux/shippingSlice';
import { fetchPaymentMethods } from '../../redux/paymentMethodAction'; // Action từ paymentMethodActions
import './ShippingForm.css'; 

const ShippingAddressForm = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  // Redux state selectors
  const user = useSelector((state) => state.auth?.login?.currentUser );
  const shippingAddresses = useSelector((state) => state.shippingAddress?.shippingAddresses || []);
  const paymentMethods = useSelector((state) => state.paymentMethod?.paymentMethods || []);
  const loading = useSelector((state) => state.shippingAddress?.loading);
  const error = useSelector((state) => state.shippingAddress?.error);

  useEffect(() => {
    if (user) {
      dispatch(getShippingAddresses(user._id)); // Fetch shipping addresses của user
    }
    fetchPaymentMethods(dispatch); // Fetch payment methods
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
      paymentMethod,
    };

    if (isEditing) {
      dispatch(updateShippingAddress(newAddress)).then(() => resetForm());
    } else {
      dispatch(createShippingAddress(newAddress)).then(() => resetForm());
    }
  };

  const handleEdit = (address) => {
    setAddress(address.address);
    setCity(address.city);
    setDistrict(address.district);
    setWard(address.ward);
    setPhoneNumber(address.phoneNumber);
    setPaymentMethod(address.paymentMethod);
    setIsEditing(true);
    setSelectedAddress(address);
  };

  const handleDelete = (addressId) => {
    if (addressId) {
      dispatch(deleteShippingAddress(addressId));
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
    setPaymentMethod('');
    setIsEditing(false);
    setSelectedAddress(null);
  };

  return (
    <div className="shipping-form-container">
      {error && <div className="error-message">{error}</div>}

      <form className="shipping-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Update Shipping Address' : 'Add Shipping Address'}</h2>

        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street Address"
          />
        </div>

        <div className="input-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>

        <div className="input-group">
          <label>District</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
          />
        </div>
        <div className="input-group">
          <label>Ward</label>
          <input
            type="text"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            placeholder="Ward"
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
        </div>

        <div className="input-group">
          <label>Payment Method</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method._id} value={method._id}>
                {method.method}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Address' : 'Add Address'}
        </button>
      </form>

      <div className="saved-addresses">
        <h3>Saved Addresses</h3>
        <div className="addresses-list">
          {shippingAddresses.map((address) => (
            <div key={address._id} className="address-card">
              <p>
                {`${address.address}, ${address.city}, ${address.district}, ${address.ward}, ${address.phoneNumber}`}
              </p>
              <p>Payment Method: {address.paymentMethod?.method || 'N/A'}</p>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(address)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(address._id)}>
                  Delete
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
          