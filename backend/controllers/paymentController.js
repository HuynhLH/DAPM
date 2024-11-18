// controllers/paymentController.js
const PaymentMethod = require('../models/PaymentMethod');

// Tạo phương thức thanh toán mới
const createPaymentMethod = async (req, res) => {
  try {
    const { method, description } = req.body;
    const newPaymentMethod = new PaymentMethod({ method, description });
    await newPaymentMethod.save();
    res.status(201).json({ message: 'Payment method created successfully', paymentMethod: newPaymentMethod });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment method', error: error.message });
    console.log(PaymentMethod); 
  }
};

// Lấy danh sách phương thức thanh toán
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res.status(200).json({ message: 'Payment methods fetched successfully', paymentMethods });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment methods', error: error.message });
  }
};

module.exports = { createPaymentMethod, getPaymentMethods };
