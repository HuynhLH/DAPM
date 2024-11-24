const express = require('express');
const axios = require("axios");
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const dealsRoutes = require('./routes/dealRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const PaymentMD = require('./models/PaymentMD'); 
const Order = require('./models/Oder');
const crypto = require('crypto');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
mongoose.connect(process.env.MONGODB_URL, {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB', err));

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/api/products", productRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment-methods', paymentRoutes);
app.use('/api/shipping-addresses', shippingRoutes);

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

app.post("/payment", async (req, res) => {
    const { amount, orderInfo, items } = req.body;

    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000/payment-result';
    var ipnUrl = 'https://a062-2405-4803-c845-bf20-a0d9-86d-a2f2-3459.ngrok-free.app/callback';
    var requestType = "payWithMethod";
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = JSON.stringify({ items }); // Gửi danh sách sản phẩm
    var autoCapture = true;
    var lang = 'vi';

    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);

    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    const requestBody = {
        partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType,
        autoCapture,
        extraData,
        signature
    };

    try {
        const response = await axios.post("https://test-payment.momo.vn/v2/gateway/api/create", requestBody, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Error in MoMo Payment API:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Payment Error"
        });
    }
});
app.post("/callback", async (req, res) => {
    console.log("callback:: ");
    console.log(req.body);
    
    const { transId, orderId, amount, orderInfo, resultCode, message, paymentMethod } = req.body;

    const status = resultCode === 0 ? 'success' : 'failure';

    // Tạo dữ liệu thanh toán
    const paymentData = {
        orderId,
        transactionId: transId,
        amount,
        status,
        message,
        paymentMethod
    };

    try {
        const payment = new PaymentMD(paymentData);
        await payment.save();
        console.log('Payment saved successfully');

        // Cập nhật trạng thái đơn hàng
        const order = await Order.findOne({ orderId }); 
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status === 'success' ? 'Completed' : 'Cancelled';
        order.payment = payment._id; 

        await order.save(); 
        console.log('Order updated successfully');

        return res.status(200).json({ status: 'success' });

    } catch (error) {
        console.error('Error saving payment or updating order:', error);
        return res.status(500).json({ message: 'Error saving payment or updating order' });
    }
});


  
app.post("/transaction-status",async (req,res)=>{
    const{orderId} = req.body;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: "MOMO",
        requestId: orderId,
        orderId,
        signature,
        lang:'vi'
    })
    //option
    const options = {
        method: "POST",
        url:'https://test-payment.momo.vn/v2/gateway/api/query',
        headers:{
            'Content-Type': "application/json"
        },
        data:requestBody
    }

    let result = await axios(options);

    return res.status(200).json(result.data);
})

// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
