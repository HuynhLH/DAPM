const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require("./routes/auth");
const dotenv = require("dotenv"); 
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');  


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB', err));

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Item = mongoose.model('Item', ItemSchema);

// API endpoint lấy danh sách items
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// API endpoint thêm item mới
app.post('/items', async (req, res) => {
    const { name, price } = req.body;
    const newItem = new Item({ name, price });
    await newItem.save();
    res.status(201).json(newItem);
});

//Routes
app.use("/v1/auth",authRoute);
app.use("/v1/user",userRoute);

// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//json web token 

//AUTHENTICATION
//AUTHORIZATION