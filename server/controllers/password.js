var Password = require('../models/password');
var crypto = require('../crypto');

module.exports.retrieveAll = function(req, res, next) {
  Password.request('all', function(err, passwords) {
    if(err) {
      next(err);
    } else {
      for (var i = 0,len = passwords.length;i < len; i++) {
        passwords[i].password = crypto.decrypt(passwords[i].password, true);
      }
      res.status(200).json(passwords);
    }
  });
};

module.exports.findById = function(req, res, next) {
  Password.find(req.params.id, function(err, password) {
    if(err) {
      next(err);
    } else {
      password.password = crypto.decrypt(password.password, true);
      res.status(200).send(password);
    }
  });
};

module.exports.create = function(req, res) {
  var pass = req.body;

  // Missing parameters
  if (typeof pass.name === 'undefined') {
    res.status(500).json({status: 'error', message: 'on empty name'});
  }
  
  if (typeof pass.login === 'undefined') {
    res.status(500).json({status: 'error', message: 'on empty login'});
  }
  
  if (typeof pass.password === 'undefined') {
    res.status(500).json({status: 'error', message: 'on empty pass'});
  }
  
  pass.password = crypto.encrypt(pass.password, true);
  Password.create(pass, function(err, password) {
    if(err) {

      next(err);
    } else {

      res.status(201).send(password);
    }
  });
};

module.exports.update = function(req, res, next) {
  var pass = req.body;

  // Missing parameters
  if (typeof pass.name === 'undefined') {
    res.status(500).json({status: 'error', message: 'on empty name'});
  }
  
  if (typeof pass.login === 'undefined') {
    res.status(500).json({status: 'error', message: 'on empty login'});
  }
  
  if (typeof pass.password === 'undefined') {
    res.status(500).json({status: 'error', message: 'on empty pass'});
  }
  
  Password.find(req.params.id, function(err, password) {
    if(err) {
      next(err);
    } else if(!password) {
      res.sendStatus(404);
    } else {
      pass.password = crypto.encrypt(pass.password, true);
      password.updateAttributes(pass, function(err, password) {
        if(err) {
          next(err);
        } else {
          res.status(200).send(password);
        }
      });
    }

  });
};

module.exports.destroy = function(req, res, next) {
  Password.destroy(req.params.id, function(err) {
    if(err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
};