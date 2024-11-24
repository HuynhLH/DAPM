const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true }, 
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true }, 
  message: { type: String },  
  paymentMethod: { type: String },  
  createdAt: { type: Date, default: Date.now }
});

const PaymentMD = mongoose.model('PaymentMD', paymentSchema);

module.exports = PaymentMD;
