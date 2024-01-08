import User from "../../models/User.js"
import { CreateTransaction } from "../../utils/Index.js"
import Transaction from "../../models/Transaction.js"

export const Payearnings = async (req, res) => {
    //console.log("my data here",req.body)
    const amount = 2

    const findUser = await User.findOne({_id: req.body.id})
//    const findme = await User.findOne({apiKey: '9ug81s8ydojyq75pwgewd'})

//    if(findme){
//     console.log("user found")
//    }

    if(findUser){
        const updateBalance = parseInt(findUser.balance ) + parseInt(amount)
        
        await User.updateMany({_id : findUser._id},{$set:{ balance : updateBalance}}) 
       
    }

    const data = {
        id:req.body.id,
        // amount: req.body.amount,
        amount,
        type:req.body.type,
        description:req.body.description,  
    }

    // const response  = new Transaction({...data})
    // await response.save()
    // return res.status(201).json({message:"successfully paid earning"});

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
    // const newdata = {

    // }
   console.log(payload)

  //const addTransaction = await CreateTransaction(data)
  const result = await res.status(200).send(payload);
  return  result

   


}
