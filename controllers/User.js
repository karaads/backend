// Get current user
import User from "../models/User.js";
export const CurrentUser = async (req, res)=>{
    const _id = req.user._id
 const user =   await User.findOne({ _id})
 console.log(user)



    console.log(req.body)
    return res.status(200).send(user);
 
 }
 