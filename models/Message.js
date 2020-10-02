

const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    name: String,
    rating: String,
    description: String,
    email: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('message', MessageSchema);
