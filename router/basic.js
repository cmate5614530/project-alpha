const app = require('express').Router();
const Basic = require('../models/BasicInfo');
const mongoose = require('mongoose');
app.get('/', (req, res, next) => {
    Basic.findOne()
        .then(documents => {
            res.status(200).json({
                message: "Success",
                info: documents
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.post('/', async (req, res) => {
    const { id, ...rest } = req.body;
    let basic ={};
    if (req.files) {
        let imageFile = req.files.file;
      const fileName = Date.now();
      const getFileName = req.files.file.name;
      const imgName = fileName + getFileName;
      const dirName = __dirname.replace('router', 'public');

      basic = { _id: id, siteImg:imgName,...rest };

      await imageFile.mv(`${dirName}/images/${imgName}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          Basic.updateOne({ _id: basic._id },
            basic,
            { upsert: true, setDefaultsOnInsert: true }).then(documents => {
                res.status(201).json({
                    message: 'Information Updated Successfully!',
                    info: documents
                });
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            });
            }
        });
  }else{

      basic = { _id: id, ...rest };
      Basic.updateOne({ _id: basic._id },
        basic,
        { upsert: true, setDefaultsOnInsert: true }).then(documents => {
            res.status(201).json({
                message: 'Information Updated Successfully!',
                info: documents
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
  }
  
  
});



module.exports = app;