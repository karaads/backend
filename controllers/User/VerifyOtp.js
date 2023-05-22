import express from "express";
import User from "../../models/User.js";


export  const VerifyOtp = async (req, res) => {
    console.log("check")
    const { otp } = req.body;
    try {
        const userExists = await User.find({ otp });
        if (userExists.length > 0) {
            res.status(200).send({ msg: "Otp verified successfully" , data:otp});
        }else{
            res.status(404).send({ msg: "Otp is incorrect" });
        }
    } catch (error) {
       res.status(500).send({ msg: "Internal server error" });
    }
};