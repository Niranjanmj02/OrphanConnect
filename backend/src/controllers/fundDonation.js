import { FundDonation } from '../models/fundDonation.model.js';
import { Orphanage } from '../models/orphanage.model.js';

// Create a new fund donation
const createFundDonation = async (req, res) => {
  try {
    const {
      name,
      id,
      mobileNumber,
      email,
      orphanage,
      fundAmount,
      orphanageAccountNo,
      payment,
    } = req.body;

    // Check if the orphanage exists
    const orphanageExists = await Orphanage.findById(orphanage);
    if (!orphanageExists) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    const fundDonation = new FundDonation({
      name,
      id,
      mobileNumber,
      email,
      orphanage,
      fundAmount,
      orphanageAccountNo,
      payment,
    });

    await fundDonation.save();
    res.status(201).json({ message: 'Fund donation recorded successfully', fundDonation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all fund donations
const getAllFundDonations = async (req, res) => {
  try {
    const fundDonations = await FundDonation.find().populate('orphanage', 'orphanageName emailId');
    res.status(200).json(fundDonations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single fund donation by ID
const getFundDonationById = async (req, res) => {
  try {
    const fundDonation = await FundDonation.findById(req.params.id).populate('orphanage', 'orphanageName emailId');
    if (!fundDonation) {
      return res.status(404).json({ message: 'Fund donation not found' });
    }
    res.status(200).json(fundDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createFundDonation, getAllFundDonations, getFundDonationById };