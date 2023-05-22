import express from "express";
import User from "../../models/User.js";

import { PasswordCorrect } from "../../utils/Index.js";

export const Login = async (req, res) => {
    const { email, password, phoneNumber } = req.body;
    console.log("this is req.body", req.body);
    try {
        //check if user with email already exists
        const userExists = await User.findOne({ phoneNumber });
        if (!userExists) {
            return res.status(404).send({ msg: "User does not exist" });
        }
        //check if password is correct
        const passwordCorrect = await PasswordCorrect(password, userExists);
        if (!passwordCorrect) {
            return res.status(404).send({ msg: "Password is incorrect" });
        }
        //send response
        const data = userExists
        res.status(200).send({ msg: "Login successful", data });
    } catch (error) {
        console.log("there was an  error", error);
        res.status(400).send(error);
    }
}