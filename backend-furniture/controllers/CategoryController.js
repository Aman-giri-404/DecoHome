import CategoryModel from "../models/CategoryModel.js";

//
// Create Category
//
export const createCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const exists = await CategoryModel.findOne({ name });

    if (exists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await CategoryModel.create({
      name,
      image,
      description,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get All Categories
//
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get Single Category
//
export const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Update Category
//
export const updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Delete Category
//
export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};