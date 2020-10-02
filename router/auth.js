const bcrypt = require('bcrypt');
const app = require('express').Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const passport = require('passport');
require('../passport')(passport);

app.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.status(500).json({
          message: 'Email is Already Register!',
          user: undefined
        });
      } else {
        let user = new User({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save().then(user => {
              res.status(201).json({
                message: 'User Successfully Added!',
                user
              });
            }).catch(err => {
              res.status(500).json({
                message: 'Something Went Wrong Please contact to site admin!',
                user: undefined
              });
            })
          })
        })
      }
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
// User Login
app.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found",passwordincorrect:"" });
    }// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user._id,
          name: user.name
        };// Sign token
        jwt.sign(
          payload,
          'secretOrKey',
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect", emailnotfound:"" });
      }
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = app;