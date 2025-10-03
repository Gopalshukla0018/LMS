import { User } from "../model/user.model.js";

export const getAllUsersData = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");

    if (!user) {
      return res.status(200).json({
        message: "No users found in the database.",
        success: true,
        users: [],
        count: 0,
      });
    }

    return res.status(200).json({
      message: "all users data fetched successfully",
      success: true,
      User: user,
      count: user.length,
    });
  } catch (error) {
    console.log(`error in getAllUsersData${error}`);
    res.status(500).json({
      success: false,
      message: "failed to fetch all  users data",
    });
  }
};
