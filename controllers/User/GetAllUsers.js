import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
}