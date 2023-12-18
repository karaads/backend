
import express from "express";
import User from "../../models/User.js";
import { hashPassword} from "../../utils/Index.js";


// check if user with phone number already exists in the database then send an otp to the phone number then update the otp to the user document
export const ResetPassword = async (req, res) => {

    const { otp, password } = req.body;

    const newPassword = await hashPassword(password);

    try {
        const userExists = await User.find({ otp });
        if (userExists.length > 0) {
            userExists[0].password = newPassword;
            userExists[0].otp = 0;
            await userExists[0].save();
            res.status(200).send({ msg: "Password reset successfully" ,  status: true});
        //   res.status(200).json({ msg: "Password reset successfully", status:true });
        }else{
            res.status(404).send({ msg: "there was an error reseting your password plaese try again", status: false });
        //    res.status(404).json({ msg: "there was an error reseting your password plaese try again", status: false });
        }
    } catch (error) {
       res.status(500).send({ msg: "Internal server error" });
    }


  


}