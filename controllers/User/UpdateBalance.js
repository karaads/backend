import express from "express";
import User from "../../models/User.js";

//  update user balance with new amount
export const updateBalance = async (req, res) => {
    console.log("this is req.body", req.user);
    const user = req.user
    const amount = req.body.amount
    

    try{
        const newBalance =  parseInt(user.balance) + parseInt(amount);
        await User.updateOne({ _id: user._id}, { balance: newBalance });
        res.status(200).send({ msg: "Balance updated successfully" , data: newBalance});

     } catch (error) {
            console.log("there was an  error", error);
            res.status(400).send(error);
        }

}