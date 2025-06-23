import User from "../model/userModel.js"; // ✅ Adjust this path as needed

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res
        .status(400)
        .json({ message: "Item or size not found in cart" });
    }

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get user cart
export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};

    return res.status(200).json(cartData);
  } catch (error) {
    console.error("Get user cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
