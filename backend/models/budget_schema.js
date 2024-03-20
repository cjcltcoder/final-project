const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    budget: {
        type: Number,
        required: true,
    }
}, { collection: 'budget'})

module.exports = mongoose.model('budget', budgetSchema);