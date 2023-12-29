import express from 'express'
import User from '../../models/User.js';
import Transaction from '../../models/Transaction.js';

export const Index = async (req, res) => {
    try {

           //get all Transactions
           const allTransaction = await Transaction.find()
        
           //total number of transaction 
           const numberOfTransaction = allTransaction.length
           // console.log("here",numberOfTransaction.length)
           // res.send(numberOfTransaction)
        //get all users
        const allUsers = await User.find();

        //number of users
        const numberOfUsers = allUsers.length

        //total amount in users wallet
        const sumwalletbalance = allUsers.filter(item => item.balance).map(item => (parseInt(item.balance)))
        const  amountInUsersWallet =  sumwalletbalance.reduce((a,b) => a + b, 0)
        console.log("successfully" , amountInUsersWallet)
      res.status(200).send({ msg: "successful" , numberOfUsers});

        // const findme = await User.findOne({_id: '657b0e905febac6a33e2c072'})
        // res.status(200).send({ msg: "Password reset successfully" , findme});
         

       // console.log("amount in user wallet", sumwalletbalance)

        //all vendors 
        const allVendors = allUsers.filter(item => item.userType === 'vendor').map(item =>  (item))

        // number of vendoers
        const numberOfVendors = allVendors.length

        //get all user borrowed 
        const borrowedUsers = allUsers.filter(item => item.borrowedAmount > 0).map(item =>  (item));

        //number of active borrowers
        const numberOfActiveBorrowers = borrowedUsers.length


     

        //total amount borrower 
        const arrSum = allTransaction.filter(item => item.paymentmode === 'borrow').map(item=> (parseInt(item.amount)))
        const totalAmountBorrowed =  arrSum.reduce((a,b) => a + b, 0)


        //total amount bought
        //const arrrSum = allTransaction.filter(item => item.paymentmode === 'wallet' || 'card').map(item=> (parseInt(item.amount)))
        
       // tootal amount of trasaction
        const arrrrSum = allTransaction.filter(item => item.paymentmode === 'wallet' || 'card').map(item=> (parseInt(item.amount)))
        const totalAmountOfTranasation =  arrrrSum.reduce((a,b) => a + b, 0)
        const totalAmountBought = parseInt(totalAmountOfTranasation)  - parseInt(totalAmountBorrowed) + parseInt(8000) 

        
        

        //total amount bought





        // master wallet balance


        //borrower with due date
        













      //  const data = {
            //allUsers,
          //  numberOfUsers,
           // amountInUsersWallet,
            // borrowedUsers,
            // numberOfActiveBorrowers,
            // allTransaction,
            // numberOfTransaction,
            // totalAmountBorrowed,
            // allVendors,
            // numberOfVendors,
            // totalAmountBought,
            // totalAmountOfTranasation
       // }



        //res.status(200).send("data");
        // res.status(200).send({ data:{
        //     "Number_of_user": allUsers,
        //     "Amount_iin_user_wallet":amountInUsersWallet
        // }});
    }
    catch (error) {
        res.status(404).send(error);
    }
}