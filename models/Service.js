

const mongoose = require('mongoose')

const ServiceSchema = mongoose.Schema({
  type: String,
  description: String,
  price: String,
  name: String,
  image: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

module.exports = mongoose.model('service', ServiceSchema);
