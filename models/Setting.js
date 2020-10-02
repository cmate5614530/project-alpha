

const mongoose = require('mongoose')

const SettingSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

module.exports = mongoose.model('setting', SettingSchema);
