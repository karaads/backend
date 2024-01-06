import express from "express";
import User from "../../models/User.js";
import { hashPassword, welcomeEmail, CreateTransaction } from "../../utils/Index.js";

//import { v4 as uuidv4 } from 'uuid';
//uuidv4();
export const Register = async (req, res) => {
   const code =  Math.random().toString(36).substr(2, 6);
  
    const { firstName, lastName, email, address, city, state, zip, phoneNumber, dateOfBirth, userType, vendorCode, fullname, pin, age } = req.body;
    //math.random
    const apiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const password = await hashPassword(req.body.password);
    const user = new User({age, pin, fullname, firstName, lastName, email, password, address, city, state, zip, phoneNumber, dateOfBirth, apiKey, userType, vendorCode, referalCode:code});

   // validation 
   function validateFullname(fullname) {
    // Regular expression to check for two names, each with more than 3 characters,
    // and no numbers or special characters
    var nameRegex = /^[a-zA-Z]{4,}\s[a-zA-Z]{4,}$/;
  
    // Test the full name against the regular expression and check for non-empty string
    var isValid = nameRegex.test(fullname) && fullname.trim() !== '';
  
    return isValid;
  }
  
  function validateEmail(email) {
    // Regular expression for a simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression and check for non-empty string
    var isValid = emailRegex.test(email) && email.trim() !== '';
  
    return isValid;
  }
  
  function validatePhoneNumber(phoneNumber) {
    // Regular expression for a phone number validation
    var phoneRegex = /^0\d{10}$/;
  
    // Test the phone number against the regular expression
    var isValid = phoneRegex.test(phoneNumber);
  
    return isValid;
  }
  
  function validatePin(pin) {
    // Regular expression for a PIN validation
    var pinRegex = /^\d{4}$/;
  
    // Test the PIN against the regular expression
    var isValid = pinRegex.test(pin);
  
    return isValid;
  }
  
  function validateAge(age) {
    // Regular expression for age validation
    var ageRegex = /^(1[89]|[2-9]\d+)$/;
  
    // Test the age against the regular expression and check for non-empty string
    var isValid = ageRegex.test(age) && age.trim() !== '';
  
    return isValid;
  }
  
  function validatePassword(password) {
    // Check if the password is not empty and is 6 characters long
    var isValid = password.trim() !== '' && password.length === 6;
  
    return isValid;
  }


  if(!validateFullname(fullname)){ 
    const data = {
        status: false,
        message: "Full name must be more than 3 characters, must contain two names and must not contain special characters"
      }
      return res.send(data);
    }
  
    if(!validateEmail(email)){
        const data = {
            status: false,
            message: "your email is invalid"
          }
          return res.send(data);
     
    }
  
    if(!validatePhoneNumber(phoneNumber)){
        const data = {
            status: false,
            message: "Your Phone Number Is Invalid"
          }
          return res.send(data);
    }
  
    if(!validatePin(pin)){
        const data = {
            status: false,
            message: "Invalid pin, pin should contain only four digits"
          }
          return res.send(data);
      
    }
    
    
  
    if(!validateAge(age)){
        const data = {
            status: false,
            message: "You must be at least 18 years old to create an account."
          }
          return res.send(data);
     
    }
    






    try {
        //check if user with email already exists
        const refcode = await User.findOne({referalCode: req.body.referalCode})
        const userExists = await User.findOne({ phoneNumber});
        if (userExists) {

            const data = {
                status: false,
                message: "User already exist"
              }
           
          return res.status(200).send(data);


            // return res.status(409).send({ msg: "User already exist" });
        }
        //save user to database
        await user.save();
        if(refcode){
            const updateBalance = parseInt(refcode.balance ) + parseInt(20)
            await User.updateMany({_id : refcode._id},{$set:{ balance : updateBalance}})
            const data = {
                id:refcode._id,
                amount: 20,
                type:"commission",
                description:`Referral Bonus of 20 Naira`,
                
            }
          const addTransaction = CreateTransaction(data)
          addTransaction
        }



       // send welcome email
        welcomeEmail(user.email, user.firstName);
        // const data = user
        

        const data = {
            status: true,
            message: "Signup successful"
          }
       
      return res.status(201).send(data);



    } catch (error) {
        const data = {
            status: false,
            message: error
          }
        res.status(400).send(data);
    }
}