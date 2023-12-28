import mongoose, { Schema, Document, Model } from 'mongoose';

// Create Schema
const SettingsSchema = new Schema({

    version: { type: String, default: "70"},
   
    date: {
        type: Date, 
        default: Date.now()
    }

})

// Create Model
const Settings = mongoose.model('Settings', SettingsSchema);
export default Settings;