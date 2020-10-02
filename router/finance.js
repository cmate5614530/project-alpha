const app = require('express').Router();
const Finance = require('../models/Finance');
const Counter = require('../models/Counter');
const mongoose = require('mongoose');
const fs = require('fs')

app.get('/', (req, res, next) => {
    Finance.find({}).sort({'created_at':-1}).then(result => {
        res.status(200).json({
            result
        })
    }).catch(error => {
        res.status(500).json({
            error
        })
    });
});
app.patch('/:id', async (req, res) => {
    const { emission, status, client, paymentType, amount, received, balance, lastPayment } = req.body;

    //let os = Counter.findOne({'name':'os'}).os;
    //console.log('-------os---',os);
    let finance = {emission, status, client, paymentType, amount, received, balance, lastPayment};

    Finance.updateOne({ _id: req.params.id },
        finance,
        { upsert: true, setDefaultsOnInsert: true }).then(documents => {
            res.status(201).json({
                message: 'successfully updated!',
                info: documents
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    Counter.updateOne({'name':'os'}, {$inc:{'os':1}});
});
app.post('/collect/:id', async(req,res)=>{

    const {paymentType,collectAmount,lastPayment, status} = req.body;
    let imgName2 = '';
    //let history = [];
    var historytoadd={};

    if(!!req.files && !!req.files.receipt){
        let imageFile2 = req.files.receipt;
        const fileName = Date.now();
        const getFileName2 = req.files.receipt.name;
        imgName2 = fileName+getFileName2;
        const dirName = __dirname.replace('router', 'public');
        await imageFile2.mv(`${dirName}/images/${imgName2}`);

        historytoadd={
            paymentType:paymentType,
            collectAmount:Number(collectAmount),
            paymentDate:lastPayment,
            receipt:imgName2
        }
    } else{
        historytoadd={
            paymentType:paymentType,
            collectAmount:collectAmount,
            paymentDate:lastPayment
        }
    }
    Finance.findOneAndUpdate({_id:req.params.id}, {$push:{history:historytoadd},
        $set:{imgName2:imgName2, paymentType:paymentType, lastPayment:lastPayment, status:status},
        $inc:{received:collectAmount, balance:(-1)*collectAmount}})
    .then(documents => {
        res.status(201).json({
            message: 'successfully collected!',
            info: documents
        });
    }).catch(err=>{
        res.status(500).json({
            error: err
        });
    });

})
app.post('/', async (req, res) => {
    const {emission, status, client, paymentType, amount, received, balance, lastPayment } = req.body;
    let imgName1 = '';
    let imgName2 = '';
    let history = [];
    if (!!req.files&& !!req.files.orderDetail && !!req.files.workDetail && Number(received)>0) {
        let imageFile1 = req.files.orderDetail;
        let imageFile2 = req.files.workDetail;
        const fileName = Date.now();
        const getFileName1 = req.files.orderDetail.name;
        const getFileName2 = req.files.workDetail.name;
        imgName1 = fileName + getFileName1;
        if(getFileName1 === getFileName2){
            imgName2 = '11'+fileName+getFileName2;
        }else{
            imgName2 = fileName + getFileName2;
        }
        const dirName = __dirname.replace('router', 'public');
        await imageFile1.mv(`${dirName}/images/${imgName1}`);
        await imageFile2.mv(`${dirName}/images/${imgName2}`);

        var hisitem = {
            paymentType:paymentType,
            collectAmount:Number(received),
            paymentDate:lastPayment,
            receipt:imgName2
        }
        
        history.push(hisitem);
    }
    if((!!req.files&& !!req.files.orderDetail && !req.files.workDetail)||(!!req.files&& !!req.files.orderDetail && !!req.files.workDetail&&Number(received)===0)){
        let imageFile1 = req.files.orderDetail;
        const fileName = Date.now();
        const getFileName1 = req.files.orderDetail.name;
        imgName1 = fileName + getFileName1;
        const dirName = __dirname.replace('router', 'public');
        await imageFile1.mv(`${dirName}/images/${imgName1}`);

        var hisitems = {
            paymentType:paymentType,
            collectAmount:Number(received)
        }
        
        history.push(hisitems);
    }
    let os = 0;
    await Counter.findOne({'name':'os'}).then(e=>os=e.os);
    //console.log('-------os---',os);
    const finance = new Finance({
        _id: new mongoose.Types.ObjectId(),
        os, emission, status, client, paymentType, amount, received, balance, lastPayment, imgName1, imgName2, history
    });
    await Counter.updateOne({name:'os'}, {$inc:{os:1}});
    finance.save().then(result => {
        res.status(200).json({
            message: 'successfully added!',
            result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
});

app.delete('/:id', (req, res, next) => {
    Finance.find({_id: req.params.id}).then(result=>{
        if(!!result[0].imgName1 && result[0].imgName1 !== '') {
            const dirName = __dirname.replace('router', 'public');
            fs.unlinkSync(`${dirName}/images/${result[0].imgName1}`);
        }
        if(!!result[0].imgName2 && result[0].imgName2 !== ''){
            const dirName1 = __dirname.replace('router', 'public');
            fs.unlinkSync(`${dirName1}/images/${result[0].imgName2}`);
        }
        
    });
    
    Finance.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'successfully deleted!',
                result
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
});

module.exports = app;