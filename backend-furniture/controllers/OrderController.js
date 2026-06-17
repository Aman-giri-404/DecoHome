import CartModel from "../models/CartModel.js";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/Productmodel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, addressId, paymentMethod } = req.body;

    const cart = await CartModel.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let total = 0;

    const orderItems = [];

    for (const item of cart.items) {
      total += item.product.price * item.quantity;

      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      });

      item.product.stock -= item.quantity;

      item.product.sold += item.quantity;

      await item.product.save();
    }

    const order = await OrderModel.create({
      user: userId,

      items: orderItems,

      totalAmount: total,

      paymentMethod,

      address: addressId,
    });

    cart.items = [];

    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({
      user: userId,
    })
      .populate("items.product")
      .populate("address")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: orders.length,

      orders,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const getSingleOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("items.product")
      .populate("address")
      .populate("user");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,

      {
        orderStatus: status,
      },

      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Status updated",

      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};