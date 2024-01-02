import express from 'express'
import bodyParser from 'body-parser';
import { MONGO_URL } from './config/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron'
import User from './models/User.js';
import Transaction from './models/Transaction.js';
import request from 'request';
const port = process.env.PORT || 5000;
// const corsOptions ={
//   origin: 'https://borrowlite.com/',
//  //origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//import routes
import {userRoute, powerRoute, buyRoute, trxRoute, analyticsRoute, airtimeRoute} from './routes/index.js';

//routes
app.use('/users', userRoute);
app.use('/power', powerRoute);
app.use('/buy', buyRoute )
app.use('/trx', trxRoute )
app.use('/analytics', analyticsRoute)
app.use('/airtime', airtimeRoute)



app.get('/', (req, res) => {
  res.send('Welcome to Karaads!')
})

//connect to mongodb
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(port, () => {
    console.log(`Borrowlite listening at http://localhost:${port}`)
    }
)



cron.schedule('*/60 * * * *', () => {
  console.log('running a task every minute');
  updateTransactionType();
  
});


const retry = async ()=>{
  const findme = await Transaction.find({ transactionType: 'pending' })
  console.log("this is find me ",findme)
}

async function updateTransactionType() {
  try {
    // Find all transactions with transactionType 'pending'
    const pendingTransactions = await Transaction.find({ transactionType: 'pending' });


    


    // Update transactionType to 'check' for each found transaction all get TxRef for each and pass them to thee ref paramater accoundinggly 
    for (const transaction of pendingTransactions) {
      const ref = transaction.TxRef
      var coptions = {
        method: 'GET',
        url: `https://app.kwatibank.com/api/v2/transaction_status/${ref}`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer lrJ5RFP0aJ59dTCkV6ZqtjnXJViJqWwhsc3rTyeID6h2gTxqjVRveCQ2uAkP',
          Cookie: 'kwati_bank_session=fFkEG1YVoR1hittEOdCnm9EKDwFDnXxaittPfouC'
        }
      };
      request(coptions, async function  (error, response) {
        var cresult = JSON.parse(response.body)
        console.log("result here",cresult)
         if(cresult.message == "successful"){
          await Transaction.updateOne(
              { _id: transaction._id },
              { $set: { transactionType: 'payout' } }
            );

            console.log(`Transaction ${transaction._id} updated to 'payout'`);
         }else{

         }
      })



    
    }

    console.log('All pending transactions updated to "check"');
  } catch (error) {
    console.error('Error updating transactions:', error.message);
  }
}

// Call the function to update transactions
// updateTransactionType();



// retry()


    // await Transaction.updateOne(
      //   { _id: transaction._id },
      //   { $set: { transactionType: 'pending' } }
      // );
      // console.log(`Transaction ${transaction._id} updated to 'check'`);





