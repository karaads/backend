import express from 'express';
import request from 'request';

export const BorrowCheckRef = async (req, res) => {

    const reference = req.body.reference;
    console.log("ref here",reference);


    const options = {
    url: `https://api.paystack.co/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json',
        
        // 'Authorization' :'Bearer sk_test_1ae4fcb00d9fe5e4ac4bc7a3474ba883c836f0b2',
         'Authorization' :'Bearer sk_live_3e48c6f03ba238bd609d43f699e04c7d23473d4b',
    },
};

       request(options, function(error, response, body){

        //   console.log("ref data",body)
        //   console.log("ref data",response)
        //   console.log("ref data",error)
         // res.send(body);





            if(error) {
                console.log(error.status);
            } else {
            let data = JSON.parse(body);
            console.log("ref data",data)
              res.send(data);
            }
       });

}

