import mongoose from 'mongoose';

const orphanageSchema = new mongoose.Schema({
  orphanageName: {
    type: String,
    required: true,
  },
  orphanageAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  bankAccNo: {
    type: String,
    required: true,
  },

  newPassword: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  proof: {
    type: String, // Could be a URL or file path if storing proof like a document
    required: true,
  },
}, { timestamps: true });

// Optional: Add a pre-save hook to ensure newPassword and confirmPassword match
orphanageSchema.pre('save', function (next) {
  if (this.newPassword !== this.confirmPassword) {
    return next(new Error('Passwords do not match'));
  }
  next();
});

const Orphanage = mongoose.model('Orphanage', orphanageSchema);

export { Orphanage };