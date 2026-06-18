import ProductModel from "../models/Productmodel.js";
import UserModel from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";
import ContactModel from "../models/ContactModel.js";
import PaymentModel from "../models/PaymentModel.js";

export const getDashboard = async (req, res) => {
  try {
    // Basic Counts
    const totalProducts = await ProductModel.countDocuments();

    const totalUsers = await UserModel.countDocuments({
      role: "user",
    });

    const totalOrders = await OrderModel.countDocuments();

    const pendingOrders = await OrderModel.countDocuments({
      orderStatus: "Pending",
    });

    const deliveredOrders = await OrderModel.countDocuments({
      orderStatus: "Delivered",
    });

    // Revenue
    const revenueResult = await OrderModel.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },

      {
        $group: {
          _id: null,

          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    // Low Stock

    const lowStockProducts = await ProductModel.find({
      stock: {
        $lte: 5,
      },
    });

    // Top Selling

    const topSellingProducts = await ProductModel.find()
      .sort({
        sold: -1,
      })
      .limit(5);

    // Recent Orders

    const recentOrders = await OrderModel.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // Unread Contacts

    const unreadMessages = await ContactModel.countDocuments({
      status: "Pending",
    });

    // Successful Payments

    const successfulPayments =
      await PaymentModel.countDocuments({
        status: "Success",
      });

    res.status(200).json({
      totalProducts,

      totalUsers,

      totalOrders,

      pendingOrders,

      deliveredOrders,

      totalRevenue,

      lowStockProducts,

      topSellingProducts,

      recentOrders,

      unreadMessages,

      successfulPayments,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};