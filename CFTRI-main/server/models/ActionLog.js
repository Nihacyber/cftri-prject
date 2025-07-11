import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema(
  {
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actionType: { type: String, required: true },
    category: { type: String, required: true, enum: ["Technology", "Project"] },
    details: { type: String },
    transactionId: { type: String },
    date: { type: Date, default: Date.now },
    amount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("ActionLog", actionLogSchema);
