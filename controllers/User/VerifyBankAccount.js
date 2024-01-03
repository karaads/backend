import Flutterwave from 'flutterwave-node-v3'
import request from 'request';
import User from '../../models/User.js';
import { CreateTransaction } from '../../utils/Index.js';
import Transaction from '../../models/Transaction.js';
import bigInt from 'big-integer';
import crypto from 'crypto'
// import cron from 'node-cron'

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
  const currenttime = new Date()
  const data = {
          status:true,
          message:"Transfer is Unavailable at the moment, we are working hard to bring this update to you soon"
        
      }
      res.send(data)
  
  
  }


 export  const verifyTransfer = async (req, res)=>{ 
  const data = {
    status:true,
    message:"Transfer is Unavailable at the moment, we are working hard to bring this update to you soon"
  
}
return  res.send(data)


//   const findUser = await User.findOne({apiKey: req.body.apiKey})
  
 



// var aoptions = {
//   method: 'GET',
//   url: `https://app.kwatibank.com/api/v2/accounts`,
//   headers: {
//     Accept: 'application/json',
//     Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
//     Cookie: 'kwati_bank_session=fFkEG1YVoR1hittEOdCnm9EKDwFDnXxaittPfouC'
//   }
// };

// request(aoptions, async function (error, response) {
//   if (error) {
//     const data = {
//       status: true,
//       message: "There was a network error please try again later"
//     }
//     return res.send(data);
//   }

//   var result = JSON.parse(response.body);
//   if (result[0].balance <= 300000) {
//     const data = {
//       status: true,
//       message: "Network is temporary Unavailable at the moment"
//     }
//     return res.send(data);
//   }












//   // If neither of the conditions is met, continue with the code below








//   const findUser = await User.findOne({apiKey: req.body.apiKey})
  
 
//   const  accoountdata = findUser.accountDetails[0]
//   let urlcode
//   let banktype 
//   if(accoountdata.bankName == 'Providus Bank'){
//     banktype = "kwati"
//   }else{
//     banktype ="other"
//   }



//  // generate a ref


//  const refme = {
//    userId: findUser._id,
//    name: findUser.fullname,
//    apiKey: findUser.apiKey,
//    amount: req.body.amount,
//    accountName: accoountdata.accountName,
//    bankName: accoountdata.bankName,
//    accountNumber: accoountdata.accountNumber,
//    date: new Date().getTime() // Add current time in milliseconds
//  };
//  const concatenatedString = `${refme.userId}${refme.name}${refme.apiKey}${refme.amount}${refme.accountName}${refme.bankName}${refme.accountNumber}${refme.date}`;
//  const hash = crypto.createHash('sha256').update(concatenatedString).digest('hex');

// // Take the first 30 characters of the hash
// const Ref = hash.slice(0, 30);
//    // // check user balance 
//   if(parseInt(req.body.actualAmount)  > parseInt(findUser.balance)){
//     const data = {
//       status:true,
//       message:"insufficient funds"
//        }
//     return  res.send(data)
//     }
//      // // check user limit
//   if(findUser.limit == "true"){
//     const data = {
//       status:true,
//       message:"you have reached your transfer limit for the day "
//        }
//     return  res.send(data)
//     }

//     console.log("working ..")


  
 
//               // save transaction
//             const updateBalance = parseInt(findUser.balance ) -  parseInt(req.body.actualAmount)
//               await User.updateMany({apiKey : findUser.apiKey},{$set:{ balance : updateBalance, limit : true, timelimit: Date.now()}}) 
//               const code =  Math.random().toString(36).substr(2, 6);
//               const cpayload = {
//                 userId:req.body.apiKey,
//                 amount:req.body.actualAmount,
//                 transactionType:"pending",
//                 description: "Payment from karaads",
//                 order_no: code,
//                 afterBalance:updateBalance,
//                 TxRef:Ref,
//                 accountname:accoountdata.accountName,
//                 bankname:accoountdata.bankName,
//                 accountNumber: accoountdata.accountNumber,
//                 banktype:banktype,
//                 beforeBalance : findUser.balance,
//                 phoneNumber:findUser.phoneNumber
            
//             }

//             console.log("this is tpayload", cpayload)
//             // save transaction 
//             const tresponse  = new Transaction({...cpayload})
//             await tresponse.save()

//             //check accoount balance 
           
        

//       // make transsfer call 

//          // Replace spaces with %20
//     function replaceSpaces(name) {
//     return name.replace(/ /g, '%20');
//     }
//     var bankname = replaceSpaces(accoountdata.bankName);

//     const payload = {
//       bank_name: bankname,
//       bank_code: accoountdata.bankCode,
//       acc: accoountdata.accountNumber,
//       desc: "Payment from karaads",
//       pin: '9780',
//       from: '9625761482',
//       amount : req.body.amount,
//       actualAmount: req.body.actualAmount
//     }


//     if(accoountdata.bankName == 'Providus Bank'){
//      // urlcode = `https://app.kwatibank.com/api/v2/transfer_bank?bank_name=${payload.bank_name}&bank_code=${payload.bank_code}&acc=${payload.acc}&desc=${payload.desc}&pin=${payload.pin}&from=9625761482&amount=${payload.amount}`
//       console.log("for providus here")
//       urlcode = `https://app.kwatibank.com/api/v2/transfer_sbank?from=9625761482&to=${payload.acc}&amount=${payload.actualAmount}&desc=${payload.desc}&pin=${payload.pin}&ref=${Ref}`
//     }else{
//       console.log("for noon providus")
//       urlcode = `https://app.kwatibank.com/api/v2/transfer_bank?bank_name=${payload.bank_name}&bank_code=${payload.bank_code}&acc=${payload.acc}&desc=${payload.desc}&pin=${payload.pin}&from=9625761482&amount=${payload.amount}&ref=${Ref}`
//     }

   


//     var options = {
//     method: 'POST',
//     url: urlcode,
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
//       Cookie: 'kwati_bank_session=fFkEG1YVoR1hittEOdCnm9EKDwFDnXxaittPfouC'
//     }
//   };

//   var coptions = {
//     method: 'GET',
//     url: `https://app.kwatibank.com/api/v2/transaction_status/${Ref}`,
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
//       Cookie: 'kwati_bank_session=fFkEG1YVoR1hittEOdCnm9EKDwFDnXxaittPfouC'
//     }
//   };


//   request(options, async function  (error, response) {
          
//           console.log(response.body)
//           var result = JSON.parse(response.body)
//           console.log("this is result",result);
//           console.log(result.success)
//           if(response){
//             request(coptions, async function  (error, response) {
//                         // if (error) throw new Error(error);
//                         if(error){
//                         const data = {
//                         status:true,
//                         message:error
//                         }
//                          res.send(data)
            
//                         }

//                         console.log("transaction state",response.body)
//                         var cresult = JSON.parse(response.body)
            
//                          if(cresult.message == 'successful'){
//                           const findTransaction = await Transaction.findOne({TxRef:Ref})
//                           if(findTransaction){
//                             await Transaction.updateMany({TxRef:Ref},{$set:{ transactionType:"payout", banktype: banktype}}) 
//                             const data = {
//                                             status:true,
//                                             message:`your transfer was successful, your transaction reference is, ${Ref} `
//                                         }
//                                   return  res.send(data)

//                           }
//                         }



//                           if(cresult.message == 'Ref not found.'){
//                             const findTransaction = await Transaction.findOne({TxRef:Ref})
//                             if(findTransaction){
//                               const newfindUser = await User.findOne({apiKey: req.body.apiKey})
//                               const updateBalance = parseInt(newfindUser.balance ) +  parseInt(req.body.actualAmount)
//                               await User.updateMany({apiKey : findTransaction.userId},{$set:{ balance : updateBalance, limit : false, timelimit: Date.now()}})
//                               await Transaction.updateMany({TxRef:Ref},{$set:{ transactionType:"failed", banktype: banktype, afterBalance:updateBalance,  beforeBalance : newfindUser.balance}})
                              
//                               const data = {
//                                 status:true,
//                                 message:`your Transction was not successful`
//                                }
//                                return res.send(data)
//                             }
//                           }else{
//                              const data = {
//                             status:true,
//                             message:`your Transction is pending, if it does not drop before the end of the day, you will get a reversal`
//                            }
//                            return res.send(data)
//                           }

                         
       

//           })}




//           if(error){

//           }

//         })









  
// });



   
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


