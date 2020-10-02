//Team.js

const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema({
    name: String,
    rating: String,
    description: String,
    image: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('team', TeamSchema);
