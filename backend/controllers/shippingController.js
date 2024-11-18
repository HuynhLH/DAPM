const ShippingAddress = require('../models/ShippingAddress');

// Tạo địa chỉ giao hàng mới
const createShippingAddress = async (req, res) => {
  try {
    const { user, address, city, district, ward, phoneNumber } = req.body;
    if (!user) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const newShippingAddress = new ShippingAddress({
      user, address, city, district, ward, phoneNumber
    });
    await newShippingAddress.save();
    res.status(201).json({ message: 'Shipping address created successfully', shippingAddress: newShippingAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error creating shipping address', error: error.message });
  }
};

// Lấy danh sách địa chỉ giao hàng của người dùng
const getShippingAddresses = async (req, res) => {
  try {
    const shippingAddresses = await ShippingAddress.find({ user: req.params.userId });
    res.status(200).json({ message: 'Shipping addresses fetched successfully', shippingAddresses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipping addresses', error: error.message });
  }
};

const deleteShippingAddress = async (req, res) => {
    try {
      const addressId = req.params.addressId;
      const deletedAddress = await ShippingAddress.findByIdAndDelete(addressId);
      if (!deletedAddress) {
        return res.status(404).json({ message: 'Shipping address not found' });
      }
      res.status(200).json({ message: 'Shipping address deleted successfully', addressId });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting shipping address', error: error.message });
    }
  };
  // Cập nhật địa chỉ giao hàng
const updateShippingAddress = async (req, res) => {
    try {
      const { address, city, district, ward, phoneNumber } = req.body;
      const addressId = req.params.addressId;
  
      // Kiểm tra xem địa chỉ có tồn tại không
      const updatedAddress = await ShippingAddress.findByIdAndUpdate(
        addressId,
        { address, city, district, ward, phoneNumber },
        { new: true } // Trả về địa chỉ đã được cập nhật
      );
  
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Shipping address not found' });
      }
  
      res.status(200).json({
        message: 'Shipping address updated successfully',
        shippingAddress: updatedAddress
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating shipping address',
        error: error.message
      });
    }
  };
  

module.exports = { createShippingAddress, getShippingAddresses,deleteShippingAddress,updateShippingAddress };
