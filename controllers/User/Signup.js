import express from "express";
import User from "../../models/User.js";
import { hashPassword, welcomeEmail, CreateTransaction } from "../../utils/Index.js";

//import { v4 as uuidv4 } from 'uuid';
//uuidv4();
export const Signup = async (req, res) => {
   const code =  Math.random().toString(36).substr(2, 6);
  
    const { firstName, lastName, email, address, city, state, zip, phoneNumber, dateOfBirth, userType, vendorCode, fullname, pin } = req.body;
    //math.random
    const apiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const password = await hashPassword(req.body.password);
    const user = new User({pin, fullname, firstName, lastName, email, password, address, city, state, zip, phoneNumber, dateOfBirth, apiKey, userType, vendorCode, referalCode:code});

    // function isValidEmail() {
    //     // Regular expression for basic email validation
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    //   }

      function validatePhoneNumber(phoneNumber) {
        // Regular expression for a phone number validation
        var phoneRegex = /^0\d{10}$/;
      
        // Test the phone number against the regular expression
        var isValid = phoneRegex.test(phoneNumber);
      
        return isValid;
      }

        
//   function validatePin(pin) {
//     // Regular expression for a PIN validation
//     var pinRegex = /^\d{4}$/;
  
//     // Test the PIN against the regular expression
//     var isValid = pinRegex.test(pin);
  
//     return isValid;
//   }
  
//   function validateAge(age) {
//     // Regular expression for age validation
//     var ageRegex = /^(1[89]|[2-9]\d+)$/;
  
//     // Test the age against the regular expression and check for non-empty string
//     var isValid = ageRegex.test(age) && age.trim() !== '';
  
//     return isValid;
//   }

// if (!isValidEmail(email)) {
//  return res.status(200).send({ 
//     msg: "invalide email"

// });
// }

if(!validatePhoneNumber(phoneNumber)){
    return res.status(200).send({msg:"Invalid Phone Number!"})
}
// if(!validateAge(age)){
//     return res.status(200).send({msg:"Please enter valid Age!"})
// }

// if(!validatePin(pin)){
//     return res.status(200).send({msg:`Invalid piin`})
// }




    try {
        //check if user with email already exists
        const refcode = await User.findOne({referalCode: req.body.referalCode})
        const userExists = await User.findOne({ phoneNumber});
        if (userExists) {
            console.log("working",userExists)
          return res.status(200).send({ 
                msg: "User already exist"
    
            });


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



        //send welcome email
        // welcomeEmail(user.email, user.firstName);
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