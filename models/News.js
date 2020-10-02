//News.js

const mongoose = require('mongoose')

const NewsSchema = mongoose.Schema({
  title: String,
  description: String,
  sector: String,
  image: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

module.exports = mongoose.model('news', NewsSchema);
