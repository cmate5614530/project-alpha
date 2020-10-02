const app = require('express').Router();
const User = require('../models/User');
app.get('/', (req, res, next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: "Success",
        posts: documents
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
app.put('/', (req, res, next) => {
  console.log(req.body);
});
app.delete('/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Successfully Deleted!",
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});
module.exports = app;