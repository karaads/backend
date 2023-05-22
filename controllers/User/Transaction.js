import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken, sendToUserEmail, sendSms } from "../../utils/Index.js";

//save transaction details
export const saveTransaction = async (req, res) => {
    console.log("incoming",req.body)
    const saveTransaction = new Transaction(req.body);
    
    try {
        const apiKey = req.body.apiKey;
        const Key = await User.findOne({ apiKey });
        if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
            const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
            return result
        }
        if(req.body.paymentmode === "wallet"){
            const balance =  parseInt(req.body.amount) + parseInt(req.body.servicecharge) - parseInt(Key.balance);
            Key.balance = balance;
            Key.save();
           await saveTransaction.save();
            const data = saveTransaction
           
            sendToUserEmail(data);
            sendSms(data)
           res.status(201).send({ msg: "Transaction saved successfully", data });
        }

        if(req.body.paymentmode === "vendor"){
            console.log("workking fine")
            const balance =  parseInt(Key.balance) - parseInt(req.body.amount) + parseInt(req.body.servicecharge);
            Key.balance = balance;
            Key.save();
           await saveTransaction.save();
            const data = saveTransaction
           
            sendToUserEmail(data);
            sendSms(data)
           res.status(201).send({ msg: "Transaction saved successfully", data });
        }
        
//if transaction type is borrow update users borrowedAmount with amount + service charge
        if(req.body.transactionType === "Borrow"){
            const borrowedAmount = parseInt(Key.borrowedAmount) + parseInt(req.body.amount) + parseInt(req.body.servicecharge) + parseInt(req.body.interest);
            console.log(borrowedAmount)
            Key.borrowedAmount = borrowedAmount;
            Key.save();
            await saveTransaction.save();
            const data = saveTransaction
            
            sendBorrowToken(data);
            sendSms(data)
            res.status(201).send({ msg: "Transaction saved successfully", data }); 
        }

        if(req.body.paymentmode === "card"){
          await saveTransaction.save();
        const data = saveTransaction
        sendToUserEmail(data);
        console.log("all saved")
        res.status(201).send({ msg: "Transaction saved successfully", data });  
        }
        
    }
    catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}

