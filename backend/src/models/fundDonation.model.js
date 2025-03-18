import mongoose from 'mongoose';

const fundDonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String, // Assuming this is a custom ID (e.g., donor ID), adjust if it's meant to be something else
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orphanage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orphanage', // References the Orphanage model
    required: true,
  },
  fundAmount: {
    type: Number,
    required: true,
  },
  orphanageAccountNo: {
    type: String,
    required: true,
  },
  payment: {
    type: String, // Could be a status like "pending", "completed", or a payment ID
    required: true,
  },
}, { timestamps: true });

const FundDonation = mongoose.model('FundDonation', fundDonationSchema);

export { FundDonation };