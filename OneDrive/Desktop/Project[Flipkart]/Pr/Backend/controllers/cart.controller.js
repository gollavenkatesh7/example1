import { Cart } from "../models/cart.model.js";

export const cartController = async (req, res) => {
  try {
    const { title, price, quantity, image } = req.body;
    const exist = await Cart.findOne({ title });
    if (exist) {
      exist.quantity = quantity;
      await exist.save();
      res.status(200).json({
        message: "Cart Item Updated Successfully",
        data: exist,
      });
    } else {
      const newItem = new Cart({
        title,
        price,
        quantity,
        image,
      });
      await newItem.save();
      res.status(200).json({
        message: "Cart Item Added Successfully",
        data: newItem,
      });
    }
  } catch (err) {
    console.log("Error occurred", err);
    res.status(400).json({
      message: "Error in Posting the Data",
    });
  }
};

export const getcartData = async (req, res) => {
  try {
    const data = await Cart.find({});
    res.status(200).json({
      message: "Cart items fetched successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch cart data" });
  }
};

export const removeItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Cart.findByIdAndDelete(itemId);
    if (item) {
      res.status(200).json({ message: "Item removed successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
