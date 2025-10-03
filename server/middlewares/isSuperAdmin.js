import { User } from "../model/user.model.js";

  const isSuperAdmin = async (req, res, next) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        message: "Authentication required (Token Missing or Invalid).",
        success: false,
      });
    }

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Authentication data corrupted.",
        success: false,
      });
    }

    if (user.role !== "superadmin") {
      return res.status(403).json({
        message: "Access denied. Only Super Admin can access this resource.",
        success: false,
      });
    }

    req.User = user;
    next();
  } catch (error) {
    console.error(`Error in isSuperAdmin authorization: ${error.message}`);
    return res.status(500).json({
      message: "Internal Server Error during role check.",
      error: error.message,
      success: false,
    });
  }
};

export default isSuperAdmin;
