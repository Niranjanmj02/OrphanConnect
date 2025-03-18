import express from 'express';
import { fundcontroller } from '../controllers/fundDonation.controller.js';
const donationrouter = express.Router();


donationrouter.route("/create").post(fundcontroller.createfund)
donationrouter.route("/get").get(fundcontroller.getfund)
donationrouter.route("/get/:id").get(fundcontroller.getfundbyid)

export {donationrouter}


