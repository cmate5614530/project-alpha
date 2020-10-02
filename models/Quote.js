

const mongoose = require('mongoose')

const QuoteSchema = mongoose.Schema({
    name: String,
    description: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('quote', QuoteSchema);
