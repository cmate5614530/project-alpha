

const mongoose = require('mongoose')

const FinanceSchema = mongoose.Schema({
    os: {type:Number,default:0},
    emission: {type:Date},
    status: {type:String},
    client: {type:String},
    paymentType:{type:String},
    amount: {type:Number},
    received: {type:Number},
    balance: {type:Number},
    imgName1: {type:String},
    imgName2: {type:String},
    lastPayment: {type:Date},
    history: {type:Array, require:false}
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('finance', FinanceSchema);
