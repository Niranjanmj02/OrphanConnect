import { Orphanage } from '../models/orphanage.model.js';

// Register a new orphanage
const registerOrphanage = async (req, res) => {
  try {
    const {
      orphanageName,
      orphanageAddress,
      city,
      pincode,
      phoneNo,
      emailId,
      bankAccNo,
      newPassword,
      confirmPassword,
      proof,
    } = req.body;

    const orphanage = new Orphanage({
      orphanageName,
      orphanageAddress,
      city,
      pincode,
      phoneNo,
      emailId,
      bankAccNo,
      newPassword,
      confirmPassword,
      proof,
    });

    await orphanage.save();
    res.status(201).json({ message: 'Orphanage registered successfully', orphanage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orphanages
const getAllOrphanages = async (req, res) => {
  try {
    const orphanages = await Orphanage.find();
    res.status(200).json(orphanages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single orphanage by ID
const getOrphanageById = async (req, res) => {
  try {
    const orphanage = await Orphanage.findById(req.params.id);
    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }
    res.status(200).json(orphanage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerOrphanage, getAllOrphanages, getOrphanageById };