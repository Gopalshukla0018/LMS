import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const Token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return res
    .status(200)
    .cookie("token", Token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //for 1 day
    })
    .json({
      sucess: true,
      message,
      user,
    });
};
