import CartModel from "../models/CartModel.js";
import ProductModel from "../models/Productmodel.js";

//
// Add Product To Cart
//
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get User Cart
//
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await CartModel.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Update Quantity
//
export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await CartModel.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Remove Item
//
export const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await CartModel.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Clear Cart
//
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await CartModel.findOneAndUpdate(
      { user: userId },
      {
        items: [],
      }
    );

    res.status(200).json({
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};