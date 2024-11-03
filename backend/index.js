const express = require('express');
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

dotenv.config();
const app = express();
app.use(express.json());
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

// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
