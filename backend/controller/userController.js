import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    // ✅ Return only the user object directly
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `getcurrentuser Error ${error.message}`,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    let adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(404).json({ message: "Admin is not found" });
    }
    return res.status(200).json({ email: adminEmail, role: "admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `getadminerror Error ${error.message}`,
    });
  }
};
