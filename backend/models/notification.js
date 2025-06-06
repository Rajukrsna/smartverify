const mongoose = require('mongoose');   


const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    desc:{
        type: String,
        default: "Transaction Completed",
    },
    type:{
        type: String,
        enum: ['success', 'error'],
        default: 'success',
    }
    });


const Notification = mongoose.model('Notification', notificationSchema);    

module.exports = Notification;