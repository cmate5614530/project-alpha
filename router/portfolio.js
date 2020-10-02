const app = require('express').Router();
const Portfolio = require('../models/Portfolio');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
    Portfolio.find({}).then(result => {
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
    const { detail, sector, } = req.body;
    let portfolio = { detail, sector };
    if (!!req.files) {
        let imageFile = req.files.file;
        const fileName = Date.now();
        const getFileName = req.files.file.name;
        const imgName = fileName + getFileName;
        portfolio.image = imgName;
        const dirName = __dirname.replace('router', 'public');
        await imageFile.mv(`${dirName}/images/${imgName}`);
      }

    Portfolio.updateOne({ _id: req.params.id },
        portfolio,
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
});
app.post('/', async (req, res) => {
    let imageFile = req.files.file;
    const fileName = Date.now();
    const getFileName = req.files.file.name;
    const imgName = fileName + getFileName;
    const dirName = __dirname.replace('router', 'public');

    await imageFile.mv(`${dirName}/images/${imgName}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            const { detail, sector } = req.body;
            const portfolio = new Portfolio({
                _id: new mongoose.Types.ObjectId(),
                detail, sector,
                image: imgName
            });
            portfolio.save().then(result => {
                res.status(200).json({
                    message: 'successfully added: Portfolio',
                    result
                })
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

app.delete('/:id', (req, res, next) => {
    Portfolio.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Portfolio data deleted',
                result
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
});

module.exports = app;