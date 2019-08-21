const User = require('../models/user');

module.exports = {
  registerUser(req, res){
    //await User.create(req.body.user);
    console.log(req);
    console.log(res);
  }
};