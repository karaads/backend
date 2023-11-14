// Get current user
import User from "../models/User.js";
export const CurrentUser = async (req, res)=>{
   console.log("my data", req.body)
    const _id = req.body.id
    const user =   await User.findOne({ _id})
 console.log(user)



    console.log(req.body)
    return res.status(200).send(user);
 
 }
 