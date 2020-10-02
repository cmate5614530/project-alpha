const app = require('express').Router();
const News = require('../models/News');
const mongoose = require('mongoose');

app.get('/', (req, res, next) => {
  News.find({}).then(result => {
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
      const { title, description, sector } = req.body;
      const news = new News({
        _id: new mongoose.Types.ObjectId(),
        title, description, sector,
        image: imgName
      });
      news.save().then(result => {
        res.status(200).json({
          message: 'successfully added: News',
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
  const { title, description, sector } = req.body;
  let news = {
    title,
    description,
    sector,
  };
  if (!!req.files) { 
    let imageFile = req.files.file;
    const fileName = Date.now();
    const getFileName = req.files.file.name;
    const imgName = fileName + getFileName;
    news.image = imgName;
    const dirName = __dirname.replace('router', 'public');
    await imageFile.mv(`${dirName}/images/${imgName}`);
  }

  News.updateOne({ _id: req.params.id },
    news,
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
  News.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: 'News data deleted',
        result
      })
    }).catch(error => {
      res.status(500).json({
        error
      })
    });
});

module.exports = app;