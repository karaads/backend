import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken } from "../../utils/Index.js";


//payback amount and deduct from borrowedAmount 
export const paybackAmount = async (req, res) => {
    console.log("this is req.body", req.body);
    const user = req.user
    const amount = req.body.amount
    const _id = user._id;
  
    
    try{
        const Key = await User.findOne({_id : _id });
        const newBalance =  parseInt(Key.borrowedAmount) -  parseInt(amount);
        console.log(newBalance)

       await User.updateOne({ _id: user._id}, { borrowedAmount: newBalance });
        res.status(200).send({ msg: "Balance updated successfully" , data: newBalance});

     } catch (error) {
            console.log("there was an  error", error);
            res.status(400).send(error);
        }
}