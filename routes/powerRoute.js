import  express from "express";
import { verifyMeterNumber, checkBalance, buyElectricity, borrowElectricity, verifyRef} from "../utils/Index.js";
const router = express.Router();


//verify meter number
router.post('/verifyMeterNumber', (req, res) => {
    const { meterNumber, apiKey, product_code, task} = req.body;
    try {
      verifyMeterNumber(meterNumber, apiKey, res, product_code, task);
    } catch (error) {
        console.log("there was an  error", error);
        res.status(400).send(error);
    }
  })

router.post('/verifyRef', (req, res)=> {
  const {order_id, task} = req.body
  try{
    verifyRef(order_id, task, res)
  } catch (error){
    console.log("there was an  error", error);
    res.status(400).send(error);
  }
})

//check user balance
router.post('/checkBalance', (req, res) => {
    const { apiKey } = req.body;
    try {
      checkBalance(apiKey, res);
    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
  })

  //buy electricity
router.post('/buyElectricity', (req, res) => {
    const { apiKey, meterNumber, amount, product_code, task, paymentmode, address, servicecharge } = req.body;
    buyElectricity(apiKey, res, meterNumber, amount, product_code, task, paymentmode, address, amount, servicecharge);
    
  })

  //borrow electricity
router.post('/borrowElectricity', (req, res) => {
  console.log("came thr")
    const { apiKey, meterNumber, amount, product_code, task, paymentMode,address, servicecharge } = req.body;
    try {
      borrowElectricity(apiKey, res, meterNumber, amount, product_code, task, paymentMode, address, servicecharge);
    } catch (error) {
        console.log("there was an  error", error);
        res.status(400).send(error);
    }
  
})


  export { router as powerRoute };