import mongoose, { Schema, Document, Model } from 'mongoose';

// Create Schema
const TransactionSchema = new Schema({

    meter_name: { type: String},
    meter_number: { type: String },
    reference: { type: String },
    token: { type: String },
    units: { type: String },
    email: { type: String },
    apiKey: { type: String},
    firstName: { type: String},
    address: { type: String},
    phoneNumber: { type: String},
    recharge_id: { type: String},
    product_code: { type: String},
    servicecharge: { type: String},
    amount: { type: String},
    amount_charged: { type: String},
    date: { type: Date, default: Date.now},
    transactionType: { type: String},
    interest: { type: String},
    id:{ type: String},
    paymentmode:{ type: String},
    vendorCode: {type: String}
})

// Create Model
const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;