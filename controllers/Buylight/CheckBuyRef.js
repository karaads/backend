import { api_key } from "../../config/index.js";
import { saveTransaction } from "./Transaction.js";


export const CheckBuyRef =  async(req, res)=>{
  const user = req.user
  const orderId = req.body.orderId;
  const mdata = req.body
  const amount = req.body.amount
  const authCode = req.body.authCode
  console.log("allhere",mdata)
  res.set('Access-Control-Allow-Origin', '*');
  var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&order_id=${orderId}&task=check_status`
 await fetch(url)
  .then(res => res.json())
  .then(data => { 
  // console.log("all working",data)
   if(data.server_message === "Transaction Successful"){
    const payload = {
        data,
        mdata,
        user,
        amount,
        res,
        authCode
    }
   saveTransaction(payload)
    }
   const result =  res.status(200).send({ data });
     return result 
  })
  .catch(err => {
      res.status(401).send(err);
  });
} 

