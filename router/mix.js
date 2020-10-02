const app = require('express').Router();
const Mix = require('../models/Mix');


app.get('/', (req, res, next) => {
    Mix.find({}).then(result => {
      res.status(200).json({
        info: result
      })
    }).catch(error => {
      res.status(500).json({
        error
      })
    });
  });

app.post('/', async (req, res) => {
    const { title,  description } = req.body;
    let mix = { title,  description };

    if (!!req.files) {
        let imageFile = req.files.file;
        const fileName = Date.now();
        const getFileName = req.files.file.name;
        const imgName = fileName + getFileName;
        mix.image = imgName
        const dirName = __dirname.replace('router', 'public');
        await imageFile.mv(`${dirName}/images/${imgName}`);
      }
      console.log(mix);
      Mix.updateOne({ title: title },
        mix,
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

module.exports = app;