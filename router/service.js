const app = require("express").Router();
const Service = require("../models/Service");
const mongoose = require("mongoose");

app.post("/get", (req, res, next) => {
  const { page } = req.body;
  let skipItem = ((page - 1) * 9);
  Service.aggregate([
    { '$sort': { '_id': -1 } },
    {
      '$facet': {
        total: [{ $count: "value" }],
        data: [{ $skip: skipItem }, { $limit: 9 }]
      }
    }
  ])
    .then(result => {
      res.status(200).json({
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

app.get("/", (req, res, next) => {
  Service.find({})
    .then(result => {
      res.status(200).json({
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

// app.post("/", async (req, res) => {
//   const { description, type, price, name } = req.body;
//   const service = new Service({
//     _id: new mongoose.Types.ObjectId(),
//     description,
//     type,
//     price,
//     name
//   });
//   service
//     .save()
//     .then(result => {
//       res.status(200).json({
//         message: "successfully added: Service",
//         result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });


app.post("/", async (req, res) => {
  let imageFile = req.files.file;
  const fileName = Date.now();
  const getFileName = req.files.file.name;
  const imgName = fileName + getFileName;
  const dirName = __dirname.replace("router", "public");

  await imageFile.mv(`${dirName}/images/${imgName}`, err => {
    if (err) {
      return res.status(500).send(err);
    } else {
      const { description, type, price, name } = req.body;
      const service = new Service({
        _id: new mongoose.Types.ObjectId(),
        description,
        type,
        price,
        name,
        image: imgName
      });
      service
        .save()
        .then(result => {
          res.status(200).json({
            message: "successfully added: Service",
            result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

app.patch("/:id", async (req, res) => {
  const { description, type, price, name } = req.body;
  let service = {
    description,
    type,
    price,
    name
  };

  if (!!req.files) {
    let imageFile = req.files.file;
    const fileName = Date.now();
    const getFileName = req.files.file.name;
    const imgName = fileName + getFileName;
    service.image = imgName;
    const dirName = __dirname.replace("router", "public");
    await imageFile.mv(`${dirName}/images/${imgName}`);
  }

  Service.updateOne({ _id: req.params.id }, service, {
    upsert: true,
    setDefaultsOnInsert: true
  })
    .then(documents => {
      res.status(201).json({
        message: "Information Updated Successfully!",
        info: documents
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

app.delete("/:id", (req, res, next) => {
  Service.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: "Service data deleted",
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

module.exports = app;
