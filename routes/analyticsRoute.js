import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";

import { Index } from "../controllers/Analytics/Index.js";


router.get("/api/v2/analytics", Index)


export { router as analyticsRoute };