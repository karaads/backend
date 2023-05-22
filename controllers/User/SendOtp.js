import express from "express";
import User from "../../models/User.js";
import { sendOtpSms } from "../../utils/Index.js";


// check if user with phone number already exists in the database then send an otp to the phone number then update the otp to the user document
export const SendOtp = async (req, res) => {
    // math.random() generate a 4 digit number
    const otp = Math.floor(1000 + Math.random() * 9000);

    const {phoneNumber } = req.body;
    try {
        const userExists = await User.find({ phoneNumber });
        if (userExists.length > 0) {
            const data = {
                phoneNumber: userExists[0].phoneNumber,
                otp: otp
            }
            // send otp to the phone number
            sendOtpSms(data);
            // update the otp to the user document

            userExists[0].otp = otp;
            await userExists[0].save();
            res.status(200).send({ msg: "Otp sent successfully" });

        }else{
            res.status(404).send({ msg: "User with phone number does not exist" });
        }
    } catch (error) {

    }
}