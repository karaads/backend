import express from "express";
import Transaction from "../../models/Transaction.js";
;

//get all transactions
export const getAllTransactions = async (req, res) => {
   console.log("came here", req.body)
    try {
        const id = req.body.id
        // sort all transactions with id of id
        const transaction = await Transaction.find({ userId: id }).sort({ date: -1 });
        // const transaction = await Transaction.find({id}).sort( { id: -1 } );
         const data = transaction
       
        res.status(200).send({ msg: "Transaction retrieved successfully", data });
    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}