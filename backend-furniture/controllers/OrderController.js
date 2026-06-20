import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";

//
// CREATE ORDER
//
export const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      address,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order items cannot be empty.",
      });
    }

    // Update stock and sold count
    for (const item of items) {
      const product = await ProductModel.findById(
        item.product
      );

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.title} is out of stock.`,
        });
      }

      product.stock -= item.quantity;
      product.sold += item.quantity;

      await product.save();
    }

    const order = await OrderModel.create({
      user,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      address,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// GET ALL ORDERS
//
export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("address")
      .populate(
        "items.product",
        "title image price"
      )
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


//
// GET SINGLE ORDER
//
export const getSingleOrder = async (
  req,
  res
) => {
  try {
    const order = await OrderModel.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("address")
      .populate(
        "items.product",
        "title image price"
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// GET USER ORDERS
//
export const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      user: req.params.userId,
    })
      .populate(
        "items.product",
        "title image price"
      )
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


//
// UPDATE ORDER STATUS
//
export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedStatuses.includes(orderStatus)
    ) {
      return res.status(400).json({
        message: "Invalid order status.",
      });
    }

    const order =
      await OrderModel.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus,
        },
        {
          new: true,
        }
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json({
      message:
        "Order status updated successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};