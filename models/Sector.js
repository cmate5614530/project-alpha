const mongoose = require('mongoose')

const SectorSchema = mongoose.Schema({
  title: {type:String,require:true},
  sector:{type:String,require:true},
  parentId:{type:String,require:true}
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

module.exports = mongoose.model('sector', SectorSchema);