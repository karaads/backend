import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken } from "../../utils/Index.js";


//payback amount and deduct from borrowedAmount 
export const paybackAmount = async (req, res) => {
    const apiKey = req.body.apiKey;
    const Key = await User.findOne({ apiKey });
    if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
        const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
        return result
    }
    
    try {
       
        if(req.body.paymentmode === "card"){
            const borrowedAmount = parseInt(Key.borrowedAmount) - parseInt(req.body.amount);
    Key.borrowedAmount = borrowedAmount;
    Key.save();
    const saveTransaction = new Transaction(req.body);
        const data = saveTransaction
        res.status(201).send({ msg: "Transaction saved successfully", data });
        }else{
            const borrowedAmount = parseInt(Key.borrowedAmount) - parseInt(req.body.amount);
            Key.borrowedAmount = borrowedAmount;
            Key.balance = parseInt(Key.balance) - parseInt(req.body.amount);
            Key.save();
            const saveTransaction = new Transaction(req.body);
            const data = saveTransaction
            res.status(201).send({ msg: "Transaction saved successfully", data });

            
        }

       
    }
    catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}