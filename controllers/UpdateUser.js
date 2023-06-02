import express from "express";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";

//get transaction by user api key
export const UpdateUser = async (req, res) => {
    const { apiKey } = req.body;
    try {
        const Key = await User.findOne({ apiKey });
        if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
            const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
            return result
        }

        console.log("userdata", Key)

        // update autCode in user and save and send response

        Key.authCode = req.body.authCode;
        Key.save();
        res.status(200).send({msg: "User update successfully"});

    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}

