import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";
import { getTransactionByUser } from "../controllers/Tranasactions/GetTransactionByUser.js";
import { paybackAmount } from "../controllers/Tranasactions/Payback.js";
import { chargeBack } from "../controllers/Tranasactions/ChargeBack.js";
import { Payearnings } from "../controllers/Tranasactions/Payearnings.js";
import { getAllTransactions } from "../controllers/Tranasactions/GetTransaction.js";



router.post("/api/v2/gtrx",getAllTransactions )
router.post("/api/v2/payback", ValidateToken, paybackAmount)
router.post("/api/v2/chargeback", ValidateToken, chargeBack)
router.post("/api/v2/payout", Payearnings);

export { router as trxRoute };