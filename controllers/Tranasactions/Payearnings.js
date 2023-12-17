import User from "../../models/User.js"
import { CreateTransaction } from "../../utils/Index.js"
import Transaction from "../../models/Transaction.js"

export const Payearnings = async (req, res) => {
    console.log("my data here",req.body)

    const findUser = await User.findOne({_id: req.body.id})
    const findme = await User.findOne({_id: '657b0e905febac6a33e2c072'})
    if(findUser){
        const updateBalance = parseInt(findUser.balance ) + parseInt(req.body.amount)
        await User.updateMany({_id : findUser._id},{$set:{ balance : updateBalance}}) 
        const myBalance = parseInt(findme.balance ) + parseInt(1)
        await User.updateMany({_id : findme._id},{$set:{ balance : myBalance}})
    }


    const data = {
        id:req.body.id,
        amount: req.body.amount,
        type:req.body.type,
        description:req.body.description,  
    }

    // const response  = new Transaction({...data})
    // await response.save()
    // return res.status(201).json({message:"successfully paid earning"});


  const addTransaction = CreateTransaction(data)
  const result = await res.status(200).send({addTransaction});
  return  result

   


}
