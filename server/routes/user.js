const express = require('express');
const router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerUser } = require('../controllers/user');
const User = require('../models/user');

/* Register user */
router.post('/register', (req, res) => {
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
          res.json({status: user.email + 'registered'})
        })
        .catch(err => {
          res.send('error: ' + err)
        })
      })
    } else{
      res.json({error: 'User already exists'})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
});

router.post('/login', (req, res) => {
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
        res.send(token)
      }else {
        res.json({error: 'User does not exist'})
      }
    } else {
      res.json({error: 'User does not exist'})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
});

module.exports = router;