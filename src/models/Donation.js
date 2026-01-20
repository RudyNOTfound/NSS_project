import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Guest"
    },
    email: {
      type: String,
      default: "guest@example.com"
    },
    amount: {
      type: Number, 
      required: true,
    },
    status: {
      type: String,
      default: "pending", 
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);


const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);

export default Donation;