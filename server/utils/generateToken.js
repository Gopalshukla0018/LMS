import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });

  // // Cookie options ko define karein
  // const cookieOptions = {
  //   httpOnly: true,
  //   maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  // };


  const cookieOptions = {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    secure: process.env.NODE_ENV === "production", 
    sameSite: "none", 
  };

  res.cookie("token", token, cookieOptions).status(200).json({
    sucess: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photoUrl: user.photoUrl,
    },
  });
};

