import express from 'express'
import bodyParser from 'body-parser';
import { MONGO_URL } from './config/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
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
import {userRoute, powerRoute, buyRoute, trxRoute, analyticsRoute} from './routes/index.js';

//routes
app.use('/users', userRoute);
app.use('/power', powerRoute);
app.use('/buy', buyRoute )
app.use('/trx', trxRoute )
app.use('/analytics', analyticsRoute)



app.get('/', (req, res) => {
  res.send('Welcome to Borrowlite Api!')
})

//connect to mongodb
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.listen(port, () => {
    console.log(`Borrowlite listening at http://localhost:${port}`)
    }
)
