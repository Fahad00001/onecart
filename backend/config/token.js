import jwt from "jsonwebtoken";

export const gentoken = async (userId) => {
  try {
    let token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("token error", error);
  }
};

export const gentoken1 = async (email) => {
  try {
    let token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("token error", error);
  }
};
