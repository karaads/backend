import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken } from "../../utils/Index.js";

//get all transactions
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).send(transactions);
    }
    catch (error) {
        res.status(404).send(error);
    }
}