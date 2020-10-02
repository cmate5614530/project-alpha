const app = require('express').Router();
const Quote = require('../models/Quote');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
    Quote.find({}).then(result => {
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
    const { name,  description } = req.body;
    let quote = { name,  description };

    Quote.updateOne({ _id: req.params.id },
        quote,
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
    const { name, description } = req.body;
    const quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        name, description
    });
    quote.save().then(result => {
        res.status(200).json({
            message: 'successfully added: Quote',
            result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

app.delete('/:id', (req, res, next) => {
    Quote.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Quote data deleted',
                result
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
});

module.exports = app;   