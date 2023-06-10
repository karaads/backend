import express from 'express';
import request from 'request';
import https from 'https'


//Bearer sk_live_3e48c6f03ba238bd609d43f699e04c7d23473d4b
//Bearer sk_test_1ae4fcb00d9fe5e4ac4bc7a3474ba883c836f0b2

export const chargeBack = async ( res)=>{

    

const params = JSON.stringify({
  "authorization_code" : "AUTH_pmx3mgawyd",
  "email" : "mail@mail.com",
  "amount" : 300000
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/charge_authorization',
  method: 'POST',
  headers: {
    Authorization: 'Bearer sk_test_1ae4fcb00d9fe5e4ac4bc7a3474ba883c836f0b2',
    'Content-Type': 'application/json'
  }
}

const req = https.request(options, res => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', () => {
    console.log(JSON.parse(data))
  })
}).on('error', error => {
  console.error(error)
})

req.write(params)
req.end()

    



    


}














