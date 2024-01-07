import * as bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import User from "../models/User.js";
import fetch from "node-fetch";
import { api_key } from "../config/index.js";
import Transaction from '../models/Transaction.js';

//hash password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
//check if password is correct
export const PasswordCorrect = async (password, userExists) => {
    const passwordCorrect = await bcrypt.compare(password, userExists.password);
    return passwordCorrect;
}

//send welcome email
export const welcomeEmail = async (email, fullname) => {
    const transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'welcome@karaads.com', // generated ethereal user
            pass: 'welcomekaraads' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      


    });

    const mailOptions = {
        from: '<welcome@karaads.com>',
        to: email,
        subject: 'Welcome to Karaads',
        html: `
        Hello ${fullname},<br>

        Welcome to KaraAds, your gateway to a whole new level of interactive and rewarding advertising experiences! 🚀.<br><br>

        We're delighted to welcome you to our growing community of users who are not just engaging with ads but also earning 
        for their valuable screen time. Get ready to explore
         the exciting features KaraAds has to offer, from immersive ad experiences to unlocking opportunities to earn rewards.<br><br>

         Feel free to navigate through our platform, watch ads, and discover the unique ways in which KaraAds is changing the game. If you ever have questions or
          need assistance, our support team is here to guide you every step of the way.<br><br>

          Your presence adds value to our community, and we can't wait to see the impact you'll make.
           Welcome to KaraAds – where engagement meets rewards! 🌟<br><br>

         <b>What's more?</b><br>

         We have a 24-hour customer service policy [you all are our trophy]. So, I’m handing you<br> over to Susan.
          She’ll be your personal account officer. Feel free to contact us anytime <br>you feel like talking.<br><br>

         <b>Email: karaads101@gmail.com</b> <br>
            Thank you, and welcome again.<br>
            Follow us on social media: Instagram, Twitter and Facebook @officalkaraads<br><br>

            <b>Wisdom Kwati</b><br>
            <b>Founder  Karaads</b>
        
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const EmailOtp = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'verification@karaads.com', // generated ethereal user
            pass: 'verificationkaraads' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      


    });

    const mailOptions = {
        from: '<verification@karaads.com>',
        to: data.email,
        subject: 'Password rest',
        html: `
        Hello, you are about to reset your Karaads password, below is your OTP ${data.otp}<br><br>

        
         <b>Email: karaads101@gmail.com</b> <br>
        Follow us on social media: Instagram, Twitter and Facebook @officalkaraads<br><br>

        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const CreateTransaction = async (data) => {
    const code =  Math.random().toString(36).substr(2, 6);
    const payload = {
        userId:data.id,
        amount:data.amount,
        transactionType:data.type,
        description: data.description,
        order_no: code
    }
    // save transaction 
    const response  = new Transaction({...payload})
    await response.save()
    
}


//verify meter number
export const verifyMeterNumber = async (meterNumber,apiKey, res, product_code, task) => {
   // check if apikey is valid
   const Key = await User.findOne({ apiKey });
   if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
       const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
       return result
   }
    console.log("this is the meter number", meterNumber,product_code,task,api_key, apiKey );
    res.set('Access-Control-Allow-Origin', '*');
    var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&task=${task}`;
   await fetch(url)
    .then(res => res.json())
    .then(data => {
       
      const result =  res.send({ data });
        return result
      
    })
    .catch(err => {
        res.send(err);
    });


}

export const BorrowverifyMeterNumber = async (meterNumber,apiKey, res, product_code, task) => {
    // check if apikey is valid
    const Key = await User.findOne({ apiKey });
    if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
        const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
        return result
    }

    
     console.log("this is the meter number", meterNumber);
     res.set('Access-Control-Allow-Origin', '*');
     var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&task=${task}`;
    await fetch(url)
     .then(res => res.json())
     .then(data => {
       const result =  res.send({ data });
         return result
       
     })
     .catch(err => {
         res.send(err);
     });
 
 
 }

//check user balance
export const checkBalance = async (apiKey, res) => {
    // check if apikey is valid
    const Key = await User.findOne({ apiKey });
    if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
        const result = await res.status(200).send({ error: "Invalid API Key, Access Denied" });
        return result
    }
    const data = Key.balance;
    const result =   res.status(200).send({ data, Key});
    return result
   
}

// buy electricity
export const buyElectricity = async (apiKey, res, meterNumber, amount, product_code,) => {
        // check if apikey is valid
    const Key = await User.find({ "apiKey":apiKey });

    if(Key.length > 0){
        //get power
    try{
    res.set('Access-Control-Allow-Origin', '*');
    var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&amount=${amount}`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
       // console.log('data', data)
        const result = res.status(201).send(data)
        return result
        
    })

   } catch(error){
    const result = res.status(400).send(error)
    return result
    }
       
    }

    if(Key.length < 0){
        const result = await res.status(401).send({ error: "Invalid API Key, Access Denied" });
      return result
    }


}


export const verifyRef = async(order_id, task, res,)=>{
    var url  =`https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&order_id=${order_id}&task=check_status`;
                fetch(url).then(res => res.json()).then(data => {
                    console.log("data",data)
                    const result = res.status(201).send(data)
                    return result
                })
}


//send token to users email
export const sendToUserEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'token@borrowlite.com', // generated ethereal user
            pass: 'Mayorgnn@088' // generated ethereal password
        },
        tls:587
    });

    const mailOptions = {
        from: '<token@borrowlite.com>',
        to: data.email,
        subject: 'Borrowlite Token',
        html: `<h2>Token</h2><br>
        Hello ${data.firstName},<br>

        <h4>Transaction Successful</h3>
        <h4>Token: ${data.token}</h4>
        <h4>Meter Number: ${data.meter_number} </h4>
        <h4>Address:  </h4>
       
        <h4>Cost of Electricity: ₦ ${data.amount}</h4>
        <h4>Units: ₦ ${data.units}</h4>
        <h4> recharge id : ${data.reference}</h4>

         <b>Email: Token@borrowlite.com</b> <br>
            <b>Phone: 08106119178</b><br>
            Thank you, and welcome again.<br>
            Follow us on social media: Instagram, Twitter and Facebook @borrowlite<br><br>

            <b>Susan </b><br>
            <b>Support services @Borrowlite</b>
        
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const sendBorrowToken = async (data) => {
    // console.log("data from email", data)
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'token@borrowlite.com', // generated ethereal user
            pass: 'Mayorgnn@088' // generated ethereal password
        },
        tls:587
    });

    const mailOptions = {
        from: '<token@borrowlite.com>',
        to: data.email,
        subject: 'Borrowed Token',
        html: `<h2>Borrowed Token</h2><br>
        Hello ${data.firstName},<br>

        <h4>Transaction Successful</h3>
        <h4>Token: ${data.token}</h4>
        <h4>Meter Number: ${data.meter_number} </h4>
        <h4>Address: ${data.address} </h4>
       
       
        <h4>Cost of Electricity: ₦ ${data.amount}</h4>
        <h4>Units: ₦ ${data.units}</h4>
        <h4> recharge id : ${data.reference}</h4>
          <p> your payback time is in the next 14 days from today  </p>
          <p> you have been charged 25% for borrowing including service charges</>
          <p> you will be charged 5% of the amount borrowed if you fail to payback within 14 days</p>
          


         <b>Email: Token@circleelectricity.com</b> <br>
            <b>Phone: 08106119178</b><br>
            Thank you, and welcome again.<br>
            Follow us on social media: Instagram, Twitter and Facebook @borrowlite<br><br>

            <b>Susan </b><br>
            <b>Support services@Borrowlite.com</b>
        
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}




//borrow electrity

export const borrowElectricity = async (apiKey, res, meterNumber, amount, product_code, task, paymentMode, servicecharge) => {
    console.log("right here")
    // check if apikey is valid
    const Key = await User.findOne({ apiKey });
    if (!Key || Key.apiKey !== apiKey || Key.apiKey === undefined) {
        const result = await res.status(400).json({ error: "Invalid API Key, Access Denied" });
        return result
    }
    //if payment mode is wallet
 
        // check if user has enough balance
    

    // if amount is less than 1000
    if (amount < 1000) {
        const result = await res.status(400).json({ error: "Amount must be greater than 1000" });
        return result
    }

    // find user by meter number
   // const user = await User.findOne({ meterNumber: meterNumber });
    // if (user.meterNumber !== meterNumber) {
    //     const result = await res.status(400).json({ error: "Meter Number already exist", user });
    //     return result
    // }



    // User.findOne({
    //     meterNumber
    // }, function (err, status) {
    //     if (status) {
    //         res.send(status) 
    //         return
    //     } else {
    //       res.send("inactive")
    //       return
    //     }
    // })

   
   try{
    res.set('Access-Control-Allow-Origin', '*');
    var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&amount=${amount}`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        // check if transaction was successful
        console.log("first data", data)
        if (data.data) {
            console.log("data2",data)
            var url  =`https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&order_id=${data.data.recharge_id}&task=check_status`;
            fetch(url).then(res => res.json()).then(data => {
               
                console.log("data from verification", data)
               if(data.text_status === 'FAILED'){
               
                const result =  res.send({data});
            
            return result
               }


               if(data.text_status === 'COMPLETED'){
                console.log("good", data)
                const result =  res.send({data});
            //send email to user
            sendBorrowToken(Key, data, amount, servicecharge);
            return result
               }
            })
            
        }else{
             if(data.status === true){
            console.log("here2")
            const result =  res.send({data});
            //send email to user
            sendBorrowToken(Key, data, amount, servicecharge);
            
            return result
        }
        if(data.status === false){
            console.log("here3")
            const error_code = data.error_code;
            const result =  res.send({msg: "Please contact admin with error code 1983", error_code, data});
            return result
        }
        if(data.error_code == 1987){
            console.log("here4")
            const error_code = data.error_code;
            const result =  res.send({msg: "SERVICE NOT AVAILABLE AT THE MOMENT", error_code, data});
            return result
        }

        }



       

      
        
    })

   } catch(error){
         console.log(error)
    }
 
    
   


    // check if borrowed amount is greater than 0, if yes, deduct 70% of borrowed amount from user balance and create a new amount
    // if (Key.borrowedAmount > 0) {
    //     const newAmount = amount - (amount * 0.7);
      
    // }
       




        // update user balance

    // getpower
//    try{
//     res.set('Access-Control-Allow-Origin', '*');
//     var url = `https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&meter_number=${meterNumber}&product_code=${product_code}&amount=${amount}`;
//     await fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         // check if transaction was successful
//         if (data.status === "false") {
//             var url  =`https://smartrecharge.ng/api/v2/electric/?api_key=${api_key}&order_id=${data.data.recharge_id}&task=check_status`;
//             fetch(url).then(res => res.json()).then(data => {
//                 console.log("this is working", data.data,  data.data.status, )
//                if(data.status === "true"){
//                 console.log("here1")
//                  // deduct balance from user wallet
//             const balance = Key.balance - amount;
//             Key.balance = balance;
//             Key.save();
//             const result =  res.send({data});
//             //send email to user
//             sendToUserEmail(Key, data);
            
//             return result
               
//                }
//             })
            
//         }

//         if (data.status === "true") {
//             console.log("here2")
//             // deduct balance from user wallet
//             const balance = Key.balance - amount;
//             Key.balance = balance;
//             Key.save();
//             const result =  res.send({data});
//             //send email to user
//             sendToUserEmail(Key, data);
            
//             return result
//         }

//         // retun data
//         console.log("here3")
//         if(data.error_code === "1983"){
//             const result =  res.send({error: "Please contact admin with error code 1983"});
//             return result
//         }
//         if(data.error_code === "1987"){
//             const result =  res.send({error: "SERVICE NOT AVAILABLE AT THE MOMENT"});
//             return result
//         }
       
        
//     })

//    } catch(error){
//          console.log(error)
//     }


   

}

export const sendSms = async (data) =>{
    const  number = data.phoneNumber;
    //number = number.substring(1);
    const token = data.token;
    const body = `Your borrowlite token is ${token}. Thank you for using borrowlite`;
    const from = "Borrowlite";
    const api_token = "Nf1cjArMemxQjbu7O5uby6e8GPI4Gl4z9CoByBKzJJgRabb5d3VbQgAQCubU";

    var url = `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=${api_token}&from=${from}&to=${number}&body=${body}&dnd=2`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
    console.log(data)
    })
    .catch(err => {
        console.log(err);
    })
   

}


export const sendOtpSms = async (data) =>{
    const  number = data.phoneNumber;
    //number = number.substring(1);
   // const token = data.token;
    const body = `Your Karaads password reset code is  ${data.otp}`;
    const from = "Karaads";
    const api_token = "Nf1cjArMemxQjbu7O5uby6e8GPI4Gl4z9CoByBKzJJgRabb5d3VbQgAQCubU";

    var url = `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=${api_token}&from=${from}&to=${number}&body=${body}&dnd=2`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
    console.log(data)
    })
    .catch(err => {
        console.log(err);
    })
   

}














