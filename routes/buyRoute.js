import  express from "express";
import { VerifyMeter }  from "../controllers/Buylight/VerifyMeter.js";
import { ValidateToken } from "../middleware/ValidateToken.js";
import { BuyElectricity } from "../controllers/Buylight/BuyElectricity.js";
import { CheckBuyRef } from "../controllers/Buylight/CheckBuyRef.js";
import { saveTransaction } from "../controllers/Buylight/Transaction.js";
import { InitializePayment } from "../controllers/Buylight/InitializePayment.js";
import { Checkref } from "../controllers/Buylight/Checkref.js";
import { getTransactionByUser } from "../controllers/Tranasactions/GetTransactionByUser.js";

const router = express.Router();

router.post("/api/v2/verifymeter",ValidateToken, VerifyMeter);
router.post("/api/v2/buyelectricity", ValidateToken, BuyElectricity)
router.post("/api/v2/checkbuyref", ValidateToken, CheckBuyRef)
router.post("/api/v2/savetransaction", ValidateToken, saveTransaction)
router.post("/api/v2/initializepayment", ValidateToken, InitializePayment)
router.post("/api/v2/checkref", ValidateToken, Checkref)
router.get("/api/v2/gettransactionbyuser", ValidateToken, getTransactionByUser)



export { router as buyRoute };