import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";
import { getTransactionByUser } from "../controllers/Tranasactions/GetTransactionByUser.js";

router.get("/api/v2/gettransactionbyuser", ValidateToken, getTransactionByUser)



export { router as trxRoute };