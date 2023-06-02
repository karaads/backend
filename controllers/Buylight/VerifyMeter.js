import { api_key } from "../../config/index.js";


export const VerifyMeter =  async(req, res)=>{

  console.log(req.body)
  const meterNumber = req.body.meterNumber;
  const product_code = req.body.product_code;
  const task = "verify"
  res.set('Access-Control-Allow-Origin', '*');
  var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&task=${task}`;
 await fetch(url)
  .then(res => res.json())
  .then(data => { 
    console.log(data)
   const result =  res.status(200).send({ data });

      return result 
  })
  .catch(err => {
      res.status(401).send(err);
  });
} 

