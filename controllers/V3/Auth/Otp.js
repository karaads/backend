import express from "express";
import User from "../../../models/User.js";
import { sendOtpSms } from "../../../utils/Index.js";
import { EmailOtp } from "../../../utils/Index.js";


// check if user with phone number already exists in the database then send an otp to the phone number then update the otp to the user document
export const SendMyOtp = async (req, res) => {
    // math.random() generate a 4 digit number
    const otp = Math.floor(1000 + Math.random() * 9000);

    const {phoneNumber } = req.body;
    try {
        const userExists = await User.find({ phoneNumber });
        if (userExists.length > 0) {
            const data = {
                phoneNumber: userExists[0].phoneNumber,
                otp: otp,
                email: userExists[0].email
                
            }
            const email = userExists[0].email
            // send otp to the phone number
            sendOtpSms(data);
            // update the otp to the user document

            userExists[0].otp = otp;
            await userExists[0].save();
            await EmailOtp(data)
            const odata = {
                status:true,
                message: `OTP has been sent to your registered mobile number ${phoneNumber}, also check your email if you don't get the otp`
            }
            res.status(200).send(odata);

        }else{
            const data = {
                status:false,
                message:`Phone Number is not Registered`
            }
            res.status(200).send(data);
        }
    } catch (error) {

    }
}