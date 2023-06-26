import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";
import { getTransactionByUser } from "../controllers/Tranasactions/GetTransactionByUser.js";
import { paybackAmount } from "../controllers/Tranasactions/Payback.js";
import { BuyAirtime } from "../controllers/Airtime/BuyAirtime.js"
import { verifyStatus } from "../controllers/Airtime/VerifyStatus.js";



router.get("/api/v2/gettransactionbyuser", ValidateToken, getTransactionByUser)
router.post("/api/v2/airtime", ValidateToken, BuyAirtime)
router.post("/api/v2/verifystatus", ValidateToken, verifyStatus)


export { router as airtimeRoute };