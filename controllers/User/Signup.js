import express from "express";
import User from "../../models/User.js";
import { hashPassword, welcomeEmail } from "../../utils/Index.js";

//import { v4 as uuidv4 } from 'uuid';
//uuidv4();
export const Signup = async (req, res) => {
   
    const { firstName, lastName, email, address, city, state, zip, phoneNumber, dateOfBirth, userType } = req.body;
    //math.random
    const apiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const password = await hashPassword(req.body.password);
    const user = new User({ firstName, lastName, email, password, address, city, state, zip, phoneNumber, dateOfBirth, apiKey, userType});
    try {
        //check if user with email already exists
        const userExists = await User.findOne({ phoneNumber });
        if (userExists) {
            console.log(userExists)
            return res.status(201).send({ msg: "User already exist" });
        }
        //save user to database
        await user.save();
        console.log("this is user", user);
        //send welcome email
        welcomeEmail(user.email, user.firstName);
        const data = user
        res.status(201).send({ 
            data,
            msg: "Signup successful"

        });
    } catch (error) {
        console.log("there was an  error", error);
        res.status(400).send(error);
    }
}