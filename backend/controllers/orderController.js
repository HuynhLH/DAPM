const Order = require('../models/Oder');
const User = require('../models/User');
const Deal = require('../models/Deal');
const Product = require('../models/Products');

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
    try {
        const { userId, items, paymentMethod, shippingAddress } = req.body;

        // Kiểm tra user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Lấy tất cả sản phẩm và deals một lần
        const productIds = items.filter(item => item.product).map(item => item.product);
        const dealIds = items.filter(item => item.deal).map(item => item.deal);

        const productsFromDb = await Product.find({ '_id': { $in: productIds } });
        const dealsFromDb = await Deal.find({ '_id': { $in: dealIds } });

        // Tạo đối tượng tìm kiếm cho sản phẩm và deal
        const productsMap = productsFromDb.reduce((acc, product) => {
            acc[product._id.toString()] = product;
            return acc;
        }, {});

        const dealsMap = dealsFromDb.reduce((acc, deal) => {
            acc[deal._id.toString()] = deal;
            return acc;
        }, {});

        // Xử lý sản phẩm trong đơn hàng
        const orderItems = await Promise.all(items.map((item) => {
            let price;
            if (item.deal) {
                const deal = dealsMap[item.deal];
                if (!deal) {
                    throw new Error(`Deal with id ${item.deal} not found`);
                }
                console.log(`Deal price: ${deal.price}`); 
                price = deal.price; 
            } else if (item.product) {
                const product = productsMap[item.product];
                if (!product) {
                    throw new Error(`Product with id ${item.product} not found`);
                }
                price = product.price; 
            }
        
            if (!price) {
                throw new Error("Price is missing for product or deal");
            }
        
            return {
                product: item.product,
                deal: item.deal,
                quantity: item.quantity,
                price: price,
            };
            
        }));        
      

        // Tính tổng số tiền của đơn hàng
        const calculatedTotalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Tạo đơn hàng mới
        const newOrder = new Order({
            user: userId,
            items: orderItems,
            totalPrice: calculatedTotalPrice, 
            paymentMethod,
            shippingAddress,
            status: 'Pending',
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: savedOrder });
    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err.message });
    }
};

// Lấy danh sách đơn hàng của người dùng
const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId })
            .populate('items.product') 
            .populate('items.deal');   

        res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
};

// Cập nhật trạng thái đơn hàng (Admin hoặc User có thể cập nhật)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (err) {
        res.status(500).json({ message: "Error updating order status", error: err.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByUser,
    updateOrderStatus,
};
