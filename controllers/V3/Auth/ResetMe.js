
import express from "express";
// import User from "../../models/User.js";
// import { hashPassword} from "../../utils/Index.js";
import User from "../../../models/User.js";
import { hashPassword } from "../../../utils/Index.js";


// check if user with phone number already exists in the database then send an otp to the phone number then update the otp to the user document
export const ResetMe = async (req, res) => {

    const { otp, password } = req.body;

    const newPassword = await hashPassword(password);

    try {
        const userExists = await User.find({ otp });
        if (userExists.length > 0) {
            userExists[0].password = newPassword;
            userExists[0].otp = 0;
            await userExists[0].save();
            const data = {
                status: true,
                message: 'Your Password has been reset successfully',
            }
          return  res.status(200).send(data);
        
        }else{
            const data = {
                status: false,
                message: 'There was an error reseting your password plaese try again'

            }
            res.status(200).send(data);
        
        }
    } catch (error) {
        const data = {
            status : false,
            message: `An Error Occured ${error}`
        }
       res.status(200).send(data);
    }


  


}