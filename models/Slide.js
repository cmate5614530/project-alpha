const mongoose = require('mongoose')

const SlideSchema = mongoose.Schema({
  title: String,
  image: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

module.exports = mongoose.model('slide', SlideSchema);
