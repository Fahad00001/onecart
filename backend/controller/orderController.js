import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import razorpay from "razorpay";
const currency = "INR";
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// for user
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      amount,
      address,
      // status:"Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "order place error" });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      amount,
      address,
      // status:"Order Placed",
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "razorpay order error" });
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "razorpay order error" });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({ message: "payment successfull" });
    } else {
      res.status(400).json({ message: "payment failed" });
    }
  } catch (error) {}
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "user order error" });
  }
};

// for admin

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "adminall order error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({ message: "order status updated" });
  } catch (error) {
    return res.status(500).json({ message: "updateorder status error" });
  }
};
