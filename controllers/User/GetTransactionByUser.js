import express from "express";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";

//get transaction by user api key
export const getTransactionByUser = async (req, res) => {
    const { apiKey } = req.body;
    try {
        const Key = await User.findOne({ apiKey });
        if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
            const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
            return result
        }
        const transaction = await Transaction.find({ apiKey });
        const data = transaction
        console.log("here",data)
        res.status(200).send({ msg: "Transaction retrieved successfully", data });
    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}

