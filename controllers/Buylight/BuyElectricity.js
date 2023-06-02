import { api_key } from "../../config/index.js";
import User from "../../models/User.js";


export const Refund = async(payload, req, res)=>{
    //console.log("this is user",payload)
    const muser = payload.user
    const amount = payload.amount
    const user = await User.findOne({_id:muser._id})
     const newBalance =  parseInt(user.balance) + parseInt(amount);
     const update =  await User.updateOne({ _id: user._id}, { balance: newBalance });
     update
//    return res.status(404).send({ msg: "Password is incorrect" });
   // console.log(update)
    // res.status(201).send({data: "there was a Network error, your funds haven been refunded to your wallet, please try again later"}); 
}

export const BuyElectricity =  async(req, res)=>{
    const user = req.user
    const meterNumber = req.body.meterNumber;
    const amount = req.body.amount;
    const product_code = req.body.product_code;
    const total = req.body.total

    const data = {
            "server_message": "Transaction Failed",
            "status": true,
            "error_code": "1986",
            "data": {
              "status": "COMPLETED",
              "account": "62141331165",
              "amount": "100",
              "after_balance": "250.00",
              "service_name": "ibadan_distribution_company_prepaid",
              "date_updated": "2019-05-09 12:54:15",
              "customer_name": "MRSULAIMAN MOSHOODADESOJI",
              "recharge_id":5336195,
              "reference": "5336195",
              "meter_number": "62141331165",
              "token": "1782  0501  3487  9340  3328  ",
              "units": "Not Provided"
            },
            "text_status": "COMPLETED"

    }

  
        
    

    try{
        const result = res.status(201).send(data)
        return result
    }catch(error){
        const result = res.status(400).send(error)
         return result

    }



    // try{
    //     res.set('Access-Control-Allow-Origin', '*');
    //     var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&amount=${amount}`;
    //     await fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log('data', data)
    //        if(data.error_code == "1983" && "1982" && "1978"){
    //         const payload = {
    //             amount:total,
    //             user,
    //         }
    //         Refund(payload)
    //         return res.status(404).send({ msg: "there was a Network error, your funds haven been refunded to your wallet, please try again later" });       
    //        }
    //         const result = res.status(201).send(data)
    //         return result 
    //     })
    
    //    } catch(error){
    //     const result = res.status(400).send(error)
    //     return result
    //     }
 
}


