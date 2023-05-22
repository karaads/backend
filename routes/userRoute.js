import  express from "express";
const router = express.Router();
import { Signup } from "../controllers/User/Signup.js";
import { Login } from "../controllers/User/Login.js";
import { updateBalance } from "../controllers/User/Fundwallet.js";
import {saveTransaction} from "../controllers/User/Transaction.js";
import {getTransactionByUser} from "../controllers/User/GetTransactionByUser.js";
import {InitializePayment} from "../controllers/User/InitializePayment.js";
import {Checkref} from "../controllers/User/Checkref.js";
import {paybackAmount} from "../controllers/User/Payback.js";
import {getAllUsers} from "../controllers/User/GetAllUsers.js";
import {getAllTransactions} from "../controllers/User/GetAllTransactions.js";
import {GetUserById} from "../controllers/User/GetUserById.js";
import { BorrowCheckRef } from "../controllers/User/BorrowCheckRef.js";
import { UpdateUser } from "../controllers/User/UpdateUser.js";
import { SendOtp } from "../controllers/User/SendOtp.js";
import { VerifyOtp } from "../controllers/User/VerifyOtp.js";
import { ResetPassword } from "../controllers/User/ResetPassword.js";



//create user
router.post("/signup", Signup);

//login user
router.post("/login", Login);

//fund wallet
router.post("/fundwallet", updateBalance);

//save transaction
router.post("/saveTransaction", saveTransaction);

//get transaction by user
router.post("/getTransactionByUser", getTransactionByUser);

//initialize payment
router.post("/initializePayment", InitializePayment);

//check reference
router.post("/checkref", Checkref);

//payback amount
router.post("/payback", paybackAmount);

//get all users
router.get("/getAllUsers", getAllUsers);

//get user by id

router.post("/getUserById", GetUserById);

//get all transactions
router.get("/getAllTransactions", getAllTransactions);

//borrow check reference
router.post("/borrowCheckRef", BorrowCheckRef);

// update user 
router.post("/updateUser", UpdateUser);

// send otp
router.post("/sendOtp", SendOtp);

// verify otp
router.post("/verifyOtp", VerifyOtp);

// reset password
router.post("/resetPassword", ResetPassword);











export { router as userRoute };