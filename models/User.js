import mongoose, { Schema, Document, Model } from 'mongoose';

// Create Schema
const UserSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    userType: { type: String, default: 'user' },
    status: { type: String, default: 'active' },
    apiKey: { type: String},
    address: { type: String},
    city: { type: String},
    state: { type: String},
    zip: { type: String},
    phoneNumber: { type: String},
    dateOfBirth: { type: String},
    createdAt: { type: Date, default: Date.now },
    balance: { type: Number, default: 0 },
    borrowedAmount: {type: Number, default: 0},
    authCode: {type: String, default :'noAuthCode'},
    returningUser: { type: String},
    claims: {type: Number, default: 0},
    otp : {type: Number, default: 0},
})

// Create Model
const User = mongoose.model('User', UserSchema);
export default User;