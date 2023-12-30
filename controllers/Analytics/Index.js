import express from 'express'
import User from '../../models/User.js';
import Transaction from '../../models/Transaction.js';
import moment from 'moment'

export const Index = async (req, res) => {

    //total number of transactions
    const totalTransactionCount = await Transaction.countDocuments();
    // Serialize the array of documents to binary data
    const serializedData = Buffer.from(JSON.stringify(totalTransactionCount), 'utf-8');
    const NumberOfTransaction = JSON.parse(serializedData.toString('utf-8'));
    
    // number of payout transaction
    const  NumberOfPayoutTransactions = await Transaction.countDocuments({ transactionType: 'payout' });

     // number of error transactioon
    const  NumberOfErrorTransactions = await Transaction.countDocuments({ transactionType: 'error' });

     // number of error transactioon
     const  NumberOfEarningsTransactions = await Transaction.countDocuments({ transactionType: 'earnings' });


   // Count the number of transactions where date is equal to day
    const yesterday = moment().subtract(1, 'days').startOf('day').toISOString();
    const  NumberOfPayoutTransactionBydays= await Transaction.countDocuments({
      date: { $gte: new Date(yesterday), $lt: new Date() }, transactionType: 'payout'
    });


    // Use aggregation to find payout transactions within the date range
    const result = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: new Date(yesterday), $lt: new Date() },
          transactionType: 'payout'
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $toDouble: '$amount' } }
        }
      }
    ]).exec();

    // If there are results, access totalAmount from the first item
    const totalPayoutAmountByDays = result.length > 0 ? result[0].totalAmount : 0;


    const Eresult = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: new Date(yesterday), $lt: new Date() },
          transactionType: 'error'
        }
      },
      {
        $addFields: {
          amount: {
            $toDouble: {
              $replaceOne: {
                input: '$amount',
                find: ',',
                replacement: '.'
              }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]).exec();

    // If there are results, access totalAmount from the first item
    const totalErrorPayoutAmountByDays = Eresult.length > 0 ? Eresult[0].totalAmount : 0;



    const  ListofPayoutTransactionByDays= await Transaction.find({
      date: { $gte: new Date(yesterday), $lt: new Date() }, transactionType: 'payout'
    });

    const  ListofErrorTransactionByDays= await Transaction.find({
      date: { $gte: new Date(yesterday), $lt: new Date() }, transactionType: 'error'
    });


  
  const data = {
    "User List of transaction with error yesterday": ListofErrorTransactionByDays,
    "User List of succesful transaction yesterday": ListofPayoutTransactionByDays,
    "Life time, Total Number of Transsaction request for earnings, payout, and error": NumberOfTransaction,
    "Total number of payout transaction": NumberOfPayoutTransactions,
     "Number of transactions with error yesterday":NumberOfErrorTransactions,
     "Number of succesful transaction yesterday":NumberOfPayoutTransactionBydays,
    "Number of Earnings request": NumberOfEarningsTransactions,
    "Total amount paid yesterday without error": totalPayoutAmountByDays,
     "Total amount paid yesterday with error":totalErrorPayoutAmountByDays,

  
  }

  res.status(200).send({data})

}