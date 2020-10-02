const app = require('express').Router();
const ManageSector = require('../models/Sector');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
  ManageSector.find({}).then(result => {
    res.status(200).json({
      result
    })
  }).catch(error => {
    res.status(500).json({
      error
    })
  });
});

app.post('/', async (req, res) => {
      const { title, sector, parentId } = req.body;
      const MmanageSector = new ManageSector({
        _id: new mongoose.Types.ObjectId(),
        title,  sector, parentId

      });
      MmanageSector.save().then(result => {
        res.status(200).json({
          message: 'successfully added: ManageSector',
          result
        })
      }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    });

app.patch('/:id', async (req, res) => {
  const { title, sector, parentId } = req.body;
  let manageSector = {
    title,
    sector,
    parentId,
  };

  ManageSector.updateOne({ _id: req.params.id },
    manageSector,
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
app.delete('/:id', (req, res, next) => {
  ManageSector.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: 'ManageSector data deleted',
        result
      })
    }).catch(error => {
      res.status(500).json({
        error
      })
    });
});

module.exports = app;