import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken, sendToUserEmail, sendSms } from "../../utils/Index.js";

//save transaction details
export const saveTransaction = async (payload, req ) => {
    // const res = payload.res
    const user = payload.user
    const paymentmode = payload.mdata.paymentmode
    const amount = payload.mdata.amount
    const servicecharge =  payload.mdata.servicecharge
    const Saved = {transactionType: payload.mdata.transactionType, reference: payload.mdata.orderId, status:payload.data.data.status,  amount:payload.amount, id:user._id, firstName:user.firstName, amount,paymentmode:paymentmode }
    const saveTransaction = new Transaction(Saved);
    const interest = parseInt(amount * 0.25)
    const newauthCode = payload.mdata.authCode
    
    try {
        console.log("thiis is payload",saveTransaction)
       const _id = user._id;
       const Key = await User.findOne({_id : _id });
        if(!Key){
            return console.log("not found")
        }

    //     console.log(servicecharge, amount, interest)




       // console.log("this data",saveTransaction)


        if(paymentmode === "wallet"){
            const newamount = parseInt(amount)
            const balance = parseInt(Key.balance) - newamount ;
            Key.balance = balance;
            Key.save();
           await saveTransaction.save();
           const data = saveTransaction
            //sendToUserEmail(data);
           // sendSms(data)
          // res.status(201).send({ msg: "Transaction saved successfully", data });
        }

        // if(paymentmode === "vendor"){
        //     const newamount = parseInt(amount) + parseInt(servicecharge)
        //     const balance = parseInt(Key.balance) - newamount
        //     Key.balance = balance;
        //     const newclaims = parseInt(Key.claims) + parseInt(70)
        //     Key.claims = newclaims; 
        //     Key.save();
        //    await saveTransaction.save();
        //    const data = saveTransaction
           
        //     sendToUserEmail(data);
        //    // sendSms(data)
        //   // res.status(201).send({ msg: "Transaction saved successfully", data });
        // }
        
//if transaction type is borrow update users borrowedAmount with amount + service charge
        if(paymentmode === "borrow"){
            const newborrowedAmount =  parseInt(amount) + parseInt(servicecharge) + parseInt(interest);
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
        //  sendToUserEmail(data);
        // res.status(201).send({ msg: "Transaction saved successfully", data });  
        }
        
    }
    catch (error) {
        console.log("there was an  error", error);
       // res.status(200).send(error);
    }
}

