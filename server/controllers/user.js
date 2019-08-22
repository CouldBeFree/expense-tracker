const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

module.exports = {
  registerUser(req, res){
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      joinDate: new Date()
    };

    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(!user){
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
          .then(user => {
            res.json({status: `${user.email} registered`})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        })
      } else{
        res.json({status: 'User already exists'})
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  },

  loginUser(req, res) {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
          };
          let token = jwt.sign(payload, config.TOKEN_SECRET, {
            expiresIn: 2000
          });
          res.json({
            token: token,
            user: user
          })
        } else {
          res.json({error: 'User does not exist'})
        }
      } else {
        res.json({error: 'User does not exist'})
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  }
};