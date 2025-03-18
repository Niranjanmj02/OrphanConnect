import { User } from '../models/user.model.js';

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, phoneNo, emailId, newPassword, confirmPassword } = req.body;

    const user = new User({
      name,
      phoneNo,
      emailId,
      newPassword,
      confirmPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user (no hashing)
const loginUser = async (req, res) => {
    try {
      const { emailId, newPassword } = req.body;
  
      // Find user by email
      const user = await User.findOne({ emailId });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare plain text passwords
      if (user.newPassword !== newPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Successful login
      res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, emailId: user.emailId } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
export { registerUser, getAllUsers, getUserById ,loginUser};