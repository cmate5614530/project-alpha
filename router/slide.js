const app = require('express').Router();
const Slide = require('../models/Slide');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
  Slide.find({}).then(result => {
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
      const { title } = req.body;
      const slide = new Slide({
        _id: new mongoose.Types.ObjectId(),
        title,
        image: imgName
      });
      slide.save().then(result => {
        res.status(200).json({
          message: 'successfully added: Slide',
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
  const { title } = req.body;
  let slide = {
    title,

  };
  if (!!req.files) {
    let imageFile = req.files.file;
    const fileName = Date.now();
    const getFileName = req.files.file.name;
    const imgName = fileName + getFileName;
    slide.image = imgName;
    const dirName = __dirname.replace('router', 'public');
    await imageFile.mv(`${dirName}/images/${imgName}`);
  }

  Slide.updateOne({ _id: req.params.id },
    slide,
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
  Slide.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: 'Slide data deleted',
        result
      })
    }).catch(error => {
      res.status(500).json({
        error
      })
    });
});

module.exports = app;