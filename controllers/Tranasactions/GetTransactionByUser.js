import express from "express";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";

//get transaction by user api key
export const getTransactionByUser = async (req, res) => {
    const user = req.user
   
    try {
        const _id = user._id;
       const Key = await User.findOne({_id : _id });
        if(!Key){
            return console.log("not found")
        }
    
        const id = Key.id
        const transaction = await Transaction.find({id}).sort( { _id: -1 } );
        const data = transaction
       
    

        res.status(200).send({ msg: "Transaction retrieved successfully", data });
    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}

