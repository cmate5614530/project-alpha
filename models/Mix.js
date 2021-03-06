//Mix.js

const mongoose = require('mongoose')

const MixSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('mix', MixSchema);
