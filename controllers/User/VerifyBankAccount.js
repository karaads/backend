import Flutterwave from 'flutterwave-node-v3'

export const verifyBankAccount =  async( req, res)=>{
    console.log("res",req.body)
  const flw = new Flutterwave("FLWPUBK-aedca6af8fdc813c43262b085a9bbb76-X", "FLWSECK-e7018031b91bae1df8fee95c635ad0da-18b65e92704vt-X");
 const payload = {account_number: req.body.account_number, account_bank: req.body.account_bank};
 const response = await flw.Misc.verify_Account(payload);
 console.log("res here",response)
 res.send(response)
 
 }