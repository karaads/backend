import express from 'express';
import request from 'request';

export const InitializePayment = async (req, res) => {
   console.log('here working ....')
    // initialize paystact payment
    const email = req.body.email;
    const amount = 5000;
    const callback_url = 'https://borrowlite.com/detailspage';
  // const callback_url = 'http://localhost:3000/detailspage';



    const options = {
        url: 'https://api.paystack.co/transaction/initialize/',
        method: 'POST',
        headers: {
            
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Content-Type': 'application/json',
           'Authorization' :'Bearer sk_test_1ae4fcb00d9fe5e4ac4bc7a3474ba883c836f0b2',
            //'Authorization' :'Bearer sk_live_3e48c6f03ba238bd609d43f699e04c7d23473d4b',
        },
       
        form: {
            'email': `${email}`,
            'amount': `${amount}`,
            'callback_url': `${callback_url}`,
            
        }
       
    };
            request(options, function(error, response, body){
                if(error) {
                    console.log(error.status);
                } else {

                let ndata = JSON.parse(body);
                console.log("ndata",ndata)
                const data = ndata.data.authorization_url;
                console.log("data",data)
                res.status(200).send({data});
              
                 // res.send(data);
                }
            });

}

