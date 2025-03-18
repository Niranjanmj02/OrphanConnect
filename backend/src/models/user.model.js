import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
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
  newPassword: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Pre-save hook to ensure newPassword and confirmPassword match
userSchema.pre('save', function (next) {
  if (this.newPassword !== this.confirmPassword) {
    return next(new Error('Passwords do not match'));
  }
  next();
});

const User = mongoose.model('User', userSchema);

export { User };