import Flutterwave from 'flutterwave-node-v3'
import request from 'request';
import User from '../../models/User.js';

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

  const findUser = await User.findOne({apiKey: req.body.apiKey})
  if(findUser){
    let charge = (Number(req.body.amount)/100)*1.5
    const updateBalance = parseInt(findUser.balance ) -  parseInt(req.body.actualAmount)
    await User.updateMany({apiKey : findUser.apiKey},{$set:{ balance : updateBalance}}) 
    res.send(data)
}
  try{

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
      console.log(data.data.status)
      //if(data.data.status == 'success'){
      //   const findUser = await User.findOne({apiKey: req.body.apiKey})
      //   if(findUser){
      //     let charge = (Number(req.body.amount)/100)*1.5
      //     const updateBalance = parseInt(findUser.balance ) -  parseInt(req.body.actualAmount)
      //     await User.updateMany({apiKey : findUser.apiKey},{$set:{ balance : updateBalance}}) 
      //     res.send(data)
      // }
     // }
      
    })
       
    .catch(error => console.log('Error:', error));
    



  }catch(error){
     res.send(error)
  }

  
  
  
  }