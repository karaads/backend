import Flutterwave from 'flutterwave-node-v3'
import request from 'request';
import User from '../../models/User.js';
import { CreateTransaction } from '../../utils/Index.js';
import Transaction from '../../models/Transaction.js';


export const verifyBankAccount =  async( req, res)=>{
  //console.log("res",req.body)
  
  const options = {
      //  hostname: 'api.paystack.co',
       port: 443,
      //  uri: `https://api.paystack.co/bank/resolve?account_number=${req.body.account_number}&bank_code=${req.body.account_bank}`,
      uri: `https://app.kwatibank.com/api/v2/acc/${req.body.account_number}/${req.body.account_bank}`,
       method: 'GET',
       headers: {
         Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
         Accept: 'application/json',
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
      port: 443,
      uri: 'https://app.kwatibank.com/api/v2/banks',
      method: 'GET',
      headers: {
        Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
        Accept: 'application/json',
      }, 
    }
    request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log("this is banklisst ",response.body)
         res.send(response.body);
         
        });          
  }




  export const addAcount = async (req, res)=>{
    const payload = req.body
    const id = req.body._id 

  
    const apiKey = req.body.apiKey 
    const findUser = await User.findOne({_id: req.body.id})
    
      const newpayload ={
        accountName:payload?.accountName,
        accountNumber:payload?.accountNumber,
        bankCode:payload?.bankCode,
        bankName:payload?.bankName,
        update:"update"

      }
     // console.log(newpayload)
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




 export const transferFunds = async (req, res)=>{
  const data = {
          status:true,
          message:"Transfer is Unavailable at the moment, we are working hard to bring this update to you soon"
        
      }
      res.send(data)
  
  
  }


 export  const verifyTransfer = async (req, res)=>{



 const data = {
          status:true,
          message:"There was a network error, please wait and try again later"
        
      }
      res.send(data)



  // const Ref = Math.random().toString(36).substr(2, 11);
  // const apiKey = req.body.apiKey
  // const findUser = await User.findOne({apiKey: req.body.apiKey})

  // // check user balance 
  // if(parseInt(req.body.actualAmount)  > parseInt(findUser.balance)){
  //   const data = {
  //     status:true,
  //     message:"insufficient funds"
  //      }
  //   return  res.send(data)
  //   }

  //   const accoountdata = findUser.accountDetails[0]
  //   console.log("this is account data",accoountdata.bankName)

  //   // Replace spaces with %20
  //   function replaceSpaces(name) {
  //   return name.replace(/ /g, '%20');
  //   }
  //   var bankname = replaceSpaces(accoountdata.bankName);

  //   const payload = {
  //     bank_name: bankname,
  //     bank_code: accoountdata.bankCode,
  //     acc: accoountdata.accountNumber,
  //     desc: "Payment from karaads",
  //     pin: '9780',
  //     from: '9625761482',
  //     amount : req.body.amount,
  //     actualAmount: req.body.actualAmount
  //   }

  //   let urlcode
  //   if(accoountdata.bankName == 'Providus Bank'){
  //    // urlcode = `https://app.kwatibank.com/api/v2/transfer_bank?bank_name=${payload.bank_name}&bank_code=${payload.bank_code}&acc=${payload.acc}&desc=${payload.desc}&pin=${payload.pin}&from=9625761482&amount=${payload.amount}`
  //     console.log("for providus here")
  //     urlcode = `https://app.kwatibank.com/api/v2/transfer_sbank?from=9625761482&to=${payload.acc}&amount=${payload.actualAmount}&desc=${payload.desc}&pin=${payload.pin}&ref=${Ref}`
  //   }else{
  //     console.log("for noon providus")
  //     urlcode = `https://app.kwatibank.com/api/v2/transfer_bank?bank_name=${payload.bank_name}&bank_code=${payload.bank_code}&acc=${payload.acc}&desc=${payload.desc}&pin=${payload.pin}&from=9625761482&amount=${payload.amount}&ref=${Ref}`
  //   }
   
    
  // var options = {
  //   method: 'POST',
  //   url: urlcode,
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
  //     Cookie: 'kwati_bank_session=fFkEG1YVoR1hittEOdCnm9EKDwFDnXxaittPfouC'
  //   }
  // };

  // var coptions = {
  //   method: 'GET',
  //   url: `https://app.kwatibank.com/api/v2/transaction_status/${Ref}`,
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
  //     Cookie: 'kwati_bank_session=fFkEG1YVoR1hittEOdCnm9EKDwFDnXxaittPfouC'
  //   }
  // };

  // async function fetchData() {
  //   try{
  //     request(options, async function  (error, response) {
  //       if (error) throw new Error(error);
  //       console.log(response.body)
  //       var result = JSON.parse(response.body)
  //       console.log("this is result",result);
  //       console.log(result.success)
  //       if(response){

  //         request(coptions, async function  (error, response) {
  //           // if (error) throw new Error(error);
  //           if(error){

  //         const data = {
  //           status:true,
  //           message:error
  //           }
  //            res.send(data)

  //           }
  //           console.log("transaction state",response.body)
  //           var cresult = JSON.parse(response.body)

  //            if(cresult.message == 'successful'){
  //         const updateBalance = parseInt(findUser.balance ) -  parseInt(req.body.actualAmount)
  //         await User.updateMany({apiKey : findUser.apiKey},{$set:{ balance : updateBalance, limit : true, timelimit: Date.now()}}) 

  //         const code =  Math.random().toString(36).substr(2, 6);
  //         const TxRef = Math.random().toString(36).substr(2, 10);
  //         const payload = {
  //           userId:req.body.apiKey,
  //           amount:req.body.actualAmount,
  //           transactionType:"payout",
  //           description: "Payment from karaads",
  //           order_no: code,
  //           afterBalance:updateBalance,
  //           TxRef:Ref,
  //           accountname:accoountdata.accountName,
            
  //       }
  //       // save transaction 
  //       const response  = new Transaction({...payload})
  //       await response.save()

  //         const data = {
  //               status:true,
  //               message:`your transfer was successful, your transaction reference is, ${Ref} `
  //           }
  //           res.send(data)
    
  //       }else{
  //         const updateBalance = parseInt(findUser.balance ) -  parseInt(req.body.actualAmount)
  //         await User.updateMany({apiKey : findUser.apiKey},{$set:{ balance : updateBalance, limit : true, timelimit: Date.now()}}) 
  //         const code =  Math.random().toString(36).substr(2, 6);
  //         const TxRef = Math.random().toString(36).substr(2, 10);
  //         const payload = {
  //           userId:req.body.apiKey,
  //           amount:req.body.actualAmount,
  //           transactionType:"error",
  //           description: "Payment from karaads",
  //           order_no: code,
  //           afterBalance:updateBalance,
  //           TxRef:TxRef,
  //           accountname:accoountdata.accountName,
            
  //       }
  //       const response  = new Transaction({...payload})
  //       await response.save()

  //         const data = {
  //               status:true,
  //               message:`there was an error with your transaction, please contact admin with your transaction reference ${Ref} `
  //           }
  //           res.send(data)

  //       }

  //         })

  //       }

        
       
        
    
  //     });


  //   }catch(error){
  //     const data = {
  //       status:true,
  //       message:error
  //   }
  //   res.send(data)
  //   }
  // }

  // fetchData()




  
   
  }



  export const updatelimit = async (req, res) => {
    console.log("this is req.body for me", req.body);
   
    try{
     
        await User.updateOne({ apiKey: req.body.apiKey}, { limit: req.body.limit });
        res.status(200).send({ msg: " updated successfully"});

     } catch (error) {
            console.log("there was an  error", error);
            res.status(400).send(error);
        }

}


