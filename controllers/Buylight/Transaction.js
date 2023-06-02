import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken, sendToUserEmail, sendSms } from "../../utils/Index.js";

//save transaction details
export const saveTransaction = async (payload, req ) => {
    const res = payload.res
    const user = payload.user
    const paymentmode = payload.mdata.paymentmode
    const amount = payload.mdata.amount
    const servicecharge =  payload.mdata.servicecharge
    const Saved = {...payload.mdata,  ...payload.data.data, id:user._id, firstName:user.firstName, amount, meter_name:payload.data.data.customer_name, address:payload.data.data.customer_address, paymentmode:paymentmode }
    const saveTransaction = new Transaction(Saved);
    const interest = 100
    const newauthCode = payload.mdata.authCode
    
  
    try {
       const _id = user._id;
       const Key = await User.findOne({_id : _id });
        if(!Key){
            return console.log("not found")
        }

        console.log(servicecharge, amount, interest)




       // console.log("this data",saveTransaction)


        if(paymentmode === "wallet"){
            const balance =  parseInt(Key.balance) - parseInt(amount) + parseInt(servicecharge);
            console.log("here")
            Key.balance = balance;
            Key.save();
           await saveTransaction.save();
           const data = saveTransaction
            sendToUserEmail(data);
           // sendSms(data)
          // res.status(201).send({ msg: "Transaction saved successfully", data });
        }

        if(paymentmode === "vendor"){
            console.log("workking fine")
            const balance =  parseInt(Key.balance) - parseInt(amount) + parseInt(servicecharge);
            Key.balance = balance;
            const newclaims = parseInt(Key.claims) + parseInt(50)
            Key.claims = newclaims; 
            Key.save();
           await saveTransaction.save();
           const data = saveTransaction
           
            sendToUserEmail(data);
           // sendSms(data)
          // res.status(201).send({ msg: "Transaction saved successfully", data });
        }
        
//if transaction type is borrow update users borrowedAmount with amount + service charge
        if(paymentmode === "borrow"){
            const newborrowedAmount = parseInt(Key.borrowedAmount) + parseInt(amount) + parseInt(servicecharge) + parseInt(interest);
            Key.borrowedAmount = newborrowedAmount;
            Key.authCode =  newauthCode
            Key.save();
            await saveTransaction.save();
            const data = saveTransaction
            sendBorrowToken(data);
            //sendSms(data)
            //res.status(201).send({ msg: "Transaction saved successfully", data }); 
        }

        if(paymentmode === "card"){
          await saveTransaction.save();
         const data = saveTransaction
         console.log(data)
         sendToUserEmail(data);
        // res.status(201).send({ msg: "Transaction saved successfully", data });  
        }
        
    }
    catch (error) {
        console.log("there was an  error", error);
       // res.status(200).send(error);
    }
}

