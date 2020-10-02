//Portfolio.js

const mongoose = require('mongoose')

const PortfolioSchema = mongoose.Schema({
    detail: String,
    sector: String,
    image: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('portfolio', PortfolioSchema);
