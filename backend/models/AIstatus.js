const mongoose = require('mongoose');

const AIstatusSchema = new mongoose.Schema({

    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
      },
    
    result: { type: String, default: null }, // Store the result of the AI processing
    createdAt: { type: Date, default: Date.now },
    
})

module.exports = mongoose.model('AIstatus', AIstatusSchema);