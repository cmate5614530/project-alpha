const app = require('express').Router();
const Message = require('../models/Message');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
    Message.find({}).then(result => {
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
    const { name, rating, description, email } = req.body;
    let message = { name, rating, description, email };

    Message.updateOne({ _id: req.params.id },
        message,
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
    const { name, rating, description, email } = req.body;
    const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        name, rating, description,email
    });
    message.save().then(result => {
        res.status(200).json({
            message: 'successfully added: Message',
            result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

app.delete('/:id', (req, res, next) => {
    Message.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Message data deleted',
                result
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
});

module.exports = app;   