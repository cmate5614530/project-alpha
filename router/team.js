const app = require('express').Router();
const Team = require('../models/Team');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
    Team.find({}).then(result => {
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
    const { name, rating, description } = req.body;
    let team = { name, rating, description };

    if (!!req.files) {
        let imageFile = req.files.file;
        const fileName = Date.now();
        const getFileName = req.files.file.name;
        const imgName = fileName + getFileName;
        team.image = imgName
        const dirName = __dirname.replace('router', 'public');
        await imageFile.mv(`${dirName}/images/${imgName}`);
      }

    Team.updateOne({ _id: req.params.id },
        team,
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
            const { name, rating, description } = req.body;
            const team = new Team({
                _id: new mongoose.Types.ObjectId(),
                name, rating, description,
                image: imgName
            });
            team.save().then(result => {
                res.status(200).json({
                    message: 'successfully added: Team',
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
    Team.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Team data deleted',
                result
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
});

module.exports = app;   