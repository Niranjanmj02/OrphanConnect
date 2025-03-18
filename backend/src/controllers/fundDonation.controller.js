import { createFundDonation, getAllFundDonations, getFundDonationById } from "./fundDonation.js";

const fundcontroller ={
    createfund:createFundDonation,
    getfund:getAllFundDonations,
    getfundbyid:getFundDonationById
}

export {fundcontroller}