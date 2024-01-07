import express from "express";
import User from "../../../models/User.js";


export  const VerifyMyOtp = async (req, res) => {
    
    const { otp } = req.body;
    try {
        const userExists = await User.find({ otp });
        if (userExists.length > 0) {
            const vdata = {
                status:true,
                data: otp,
                message:"Otp verified successfully"
            }
        
            res.status(200).send(vdata);
        }else{
            const data = {
                status:false,
                message:"Invalid Otp"
            }
            res.status(200).send(data);
        }
    } catch (error) {
        const data = {
            status:false,
            message:"Internal server error"
        }
       res.status(500).send(data);
    }
};