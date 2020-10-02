const app = require("express").Router();
const Products = require("../models/Product");
const mongoose = require("mongoose");

app.post("/get", (req, res, next) => {
  const { page } = req.body;
  let skipItem = ((page - 1) * 9);
  Products.aggregate([
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
  Products.find({})
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
      console.log(req.body);
      let {
        barcode,
        name,
        price,
        discount,
        department,
        category,
        subCategory,
        brand,
        model,
        description,
        portionn,
        measurement,
        soldByObject
      } = req.body;
      soldByObject = JSON.parse(soldByObject);
      portionn = JSON.parse(portionn);
      measurement = JSON.parse(measurement);
      const products = new Products({
        _id: new mongoose.Types.ObjectId(),
        barcode,
        name,
        price,
        discount,
        department,
        category,
        subCategory,
        brand,
        model,
        description,
        soldByObject,
        portionn,
        measurement,
        image: imgName
      });

      products
        .save()
        .then(result => {
          res.status(200).json({
            message: "successfully added: Product",
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
  let {
    barcode,
    name,
    price,
    discount,
    department,
    category,
    subCategory,
    brand,
    model,
    soldByObject,
    portionn,
    measurement,
    description
  } = req.body;

  soldByObject = JSON.parse(soldByObject);
  portionn = JSON.parse(portionn);
  measurement = JSON.parse(measurement);

  const products = {
    barcode,
    name,
    price,
    discount,
    department,
    category,
    subCategory,
    brand,
    model,
    soldByObject,
    portionn,
    measurement,
    description
  };

  if (!!req.files) {
    let imageFile = req.files.file;
    const fileName = Date.now();
    const getFileName = req.files.file.name;
    const imgName = fileName + getFileName;
    products.image = imgName;
    const dirName = __dirname.replace("router", "public");
    await imageFile.mv(`${dirName}/images/${imgName}`);
  }

  Products.updateOne({ _id: req.params.id }, products, {
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
  Products.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: "Product data deleted",
        result
      }); 
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

app.post('/category', (req, res, next) => {
  const { category } = req.body;
  Products.find({ category })
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
})

app.post('/sub-category', (req, res, next) => {
  const { subCategory } = req.body;
  Products.find({ subCategory })
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
})

app.post('/brand', (req, res, next) => {
  const { model } = req.body;
  Products.find({ model })
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
})

module.exports = app;
