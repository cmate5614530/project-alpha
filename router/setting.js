const app = require('express').Router();
const Setting = require('../models/Setting');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
  Setting.find({}).then(result => {
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
  let imageFile = req.files.file;
  const fileName = Date.now();
  const getFileName = req.files.file.name;
  const imgName = fileName + getFileName;
  const dirName = __dirname.replace('router', 'public');

  await imageFile.mv(`${dirName}/images/${imgName}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      const { title, description } = req.body;
      const setting = new Setting({
        _id: new mongoose.Types.ObjectId(),
        title, description,
        image: imgName
      });
      setting.save().then(result => {
        res.status(200).json({
          message: 'successfully added',
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

app.patch('/:id', async (req, res) => {
  const { title, description} = req.body;
  let setting = {
    title,
    description,
  };
  if (!!req.files) {
    let imageFile = req.files.file;
    const fileName = Date.now();
    const getFileName = req.files.file.name;
    const imgName = fileName + getFileName;
    setting.image = imgName;
    const dirName = __dirname.replace('router', 'public');
    await imageFile.mv(`${dirName}/images/${imgName}`);
  }

  Setting.updateOne({ _id: req.params.id },
    setting,
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
  Setting.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: 'Setting data deleted',
        result
      })
    }).catch(error => {
      res.status(500).json({
        error
      })
    });
});

module.exports = app;