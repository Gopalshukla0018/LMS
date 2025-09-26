import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true 
  },
  amount: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
}, { timestamps: true });

// FIX: Standardize to a named export
export const Purchase = mongoose.model("Purchase", purchaseSchema);