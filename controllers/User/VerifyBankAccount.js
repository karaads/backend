import Flutterwave from 'flutterwave-node-v3'
import request from 'request';
import User from '../../models/User.js';
import { CreateTransaction } from '../../utils/Index.js';
import Transaction from '../../models/Transaction.js';

export const verifyBankAccount =  async( req, res)=>{
  console.log("res",req.body)
  
  const options = {
       hostname: 'api.paystack.co',
       port: 443,
       uri: `https://api.paystack.co/bank/resolve?account_number=${req.body.account_number}&bank_code=${req.body.account_bank}`,
       method: 'GET',
       headers: {
         Authorization: 'Bearer sk_live_26e6dbd93ed0f4296f768d677069f073fb285843'
       },
       
     }
     request(options, function (error, response) {
           if (error) throw new Error(error);
           console.log(response.body)
          res.send(response.body);
          
         });
 
 }


 export const Banklist = async(req, res) =>{
  const options = {
      hostname: 'api.paystack.co',
      port: 443,
      uri: 'https://api.paystack.co/bank?country=nigeria',
      method: 'GET',
      headers: {
        Authorization: 'Bearer sk_live_26e6dbd93ed0f4296f768d677069f073fb285843'
      },
      
    }
    request(options, function (error, response) {
          if (error) throw new Error(error);
          // console.log(response.body)
         res.send(response.body);
         
        });          
  }




  export const addAcount = async (req, res)=>{
    const payload = req.body
    const id = req.body._id 

    

     fetch('https://api.paystack.co/transferrecipient', {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer sk_live_26e6dbd93ed0f4296f768d677069f073fb285843'
     },
     body: JSON.stringify({
       "type": "nuban",
       "name": `${payload?.accountName}`,
       "account_number": `${payload?.accountNumber}`,
       "bank_code": `${payload?.bankCode}`,
       "currency": "NGN"
     })
 })
 .then(response => response.json())
 .then(async (data) =>{
  console.log("the data from paystack server",data);
  if(data?.status === true){
    const apiKey = req.body.apiKey 
    const findUser = await User.findOne({_id: req.body.id})
    console.log("checking",findUser)
    if(findUser){
      const newpayload ={
        ...req.body,
        recipient_code: data?.data.recipient_code,
        bankName:data.data.details.bank_name

      }
      console.log(newpayload)
     const update =  findUser.accountDetails
     update.push(newpayload)
     findUser.save
     console.log("this is it",update)
    const  updateuser = await User.findOneAndUpdate({apiKey : apiKey},{$set:{ accountDetails : newpayload}}, {new : true})

    if(updateuser){
       return res.status(200).json({message:"Account Details Added Successfully!", findUser});
    }else{
      console.log("did not work herre")
    }
    
    }

  }



})

 }




 export const transferFunds = async (req, res)=>{
  console.log("this is transfer",req.body)
  const apiKey = req.body.apiKey
  const findUser = await User.findOne({apiKey: req.body.apiKey})
  if(findUser.balance >= 0 && findUser.balance > req.body.actualAmount ){
    try{
    // const data = {
      
    //     status:true,
    //     message:"Transfer is Unavailable at the moment, we are working to bring this update to you soon  "
      
    // }
    // res.send(data)
    //sk_test_ceb211950f0187dda44d5f1aadd5c08f66bd88c8
    //sk_live_26e6dbd93ed0f4296f768d677069f073fb285843

     fetch('https://api.paystack.co/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk_live_26e6dbd93ed0f4296f768d677069f073fb285843'
        },
        body: JSON.stringify({
          "source": "balance", 
          "reason": `${req.body.reason}`, 
          "amount":req.body.amount*100, 
          "recipient": `${req.body.recipient}`
        })
    })
    .then(response => response.json())
    .then(async (data) =>{
      // console.log("this is my ddatt",data.data.reference)
      const reference = data.data.reference

      verifyTransfer({reference, apiKey, req, res})      
    })   
    .catch(error => {
      const data = {
        status:true,
        message:"Transfer was not successful, try again later"
    }
    res.send(data)
    });
    



  }catch(error){
    const data = {
      status:true,
      message:"Transfer was not successful, try again later"
  }
  res.send(data)
  }


  }else{
    if(findUser.balance < req.body.actualAmount){
      const data = {
        status:true,
        message:"Your balance is too low for this transaction"
    }
   return res.send(data)

    }
     

  }



  // try{
  //   // const data = {
      
  //   //     status:true,
  //   //     message:"Transfer is Unavailable at the moment, we are working to bring this update to you soon  "
      
  //   // }
  //   // res.send(data)
  //   //sk_test_ceb211950f0187dda44d5f1aadd5c08f66bd88c8
  //   //sk_live_26e6dbd93ed0f4296f768d677069f073fb285843

  //    fetch('https://api.paystack.co/transfer', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer sk_live_26e6dbd93ed0f4296f768d677069f073fb285843'
  //       },
  //       body: JSON.stringify({
  //         "source": "balance", 
  //         "reason": `${req.body.reason}`, 
  //         "amount":req.body.amount*100, 
  //         "recipient": `${req.body.recipient}`
  //       })
  //   })
  //   .then(response => response.json())
  //   .then(async (data) =>{
  //     // console.log("this is my ddatt",data.data.reference)
  //     const reference = data.data.reference

  //     verifyTransfer({reference, apiKey, req, res})      
  //   })   
  //   .catch(error => {
  //     const data = {
  //       status:true,
  //       message:"Transfer was not successful, try again later"
  //   }
  //   res.send(data)
  //   });
    



  // }catch(error){
  //   const data = {
  //     status:true,
  //     message:"Transfer was not successful, try again later"
  // }
  // res.send(data)
  // }

  
  
  
  }


  const verifyTransfer = ({reference, apiKey, req, res})=>{
   

    fetch(`https://api.paystack.co/transfer/verify/${reference}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk_live_26e6dbd93ed0f4296f768d677069f073fb285843'
      },
  })
  .then(response => response.json())
  .then(async (data) =>{

    console.log("this is data",data)
    // console.log("this is my ddatt",data.data.reference)
    // const reference = data.data.reference
    // verifyTransfer({reference, req, res})






    if(data.status == true){
      console.log("this is data",data)
      const findUser = await User.findOne({apiKey: req.body.apiKey})
      if(findUser){
        const transfercode = data.data.transfer_code
        let charge = (Number(req.body.amount)/100)*1.5 
        const updateBalance = parseInt(findUser.balance ) -  parseInt(req.body.actualAmount)
        await User.updateMany({apiKey : findUser.apiKey},{$set:{ balance : updateBalance}}) 
        const code =  Math.random().toString(36).substr(2, 6);
    const payload = {
        userId:req.body.apiKey,
        amount:req.body.actualAmount,
        transactionType:"payout",
        description: "Payment from karaads",
        order_no: code,
        afterBalance:updateBalance,
        TxRef:data.data.transfer_code,
        accountname:data.data.recipient.name,
        recipient_code:data.data.recipient.recipient_code


    }
    // save transaction 
    const response  = new Transaction({...payload})
    await response.save()

      //   const ddata = {
      //     id:req.body.id,
      //     amount: req.body.amount,
      //     //amount,
      //     type:"payout",
      //     description:"payout",
          

      // }

      // const addTransaction = await CreateTransaction(ddata)
      //  addTransaction
      

        // res.send(data, d)
        const mdata = {
          status:true,
          message:`Transfer was successful, payment status: ${data.data.status}, transsferCode: ${transfercode}`
      }
      res.send(mdata)
   }
   }else{
    const data = {
      status:true,
      message:"Transfer was not successful, try again later"
  }
  res.send(data)

   }
    
  })   
  .catch(error => {
    const data = {
      status:true,
      message:"Transfer was not successful, try again later"
  }
  res.send(data)

  });



  
  }


