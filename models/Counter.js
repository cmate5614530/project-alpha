const mongoose = require('mongoose');
const CounterSchema = mongoose.Schema({
    name:{type:String},
    os:{type:Number}
})
module.exports = mongoose.model('counter', CounterSchema);