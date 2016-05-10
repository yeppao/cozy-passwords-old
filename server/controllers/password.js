var Password = require('../models/password');

module.exports.retrieveAll = function(req, res, next) {
  Password.request('all', function(err, passwords) {
    if(err) {
      /*
       If an unexpected error occurs, forward it to Express error
       middleware which will send the error properly formatted.
       */
      next(err);
    } else {
      /*
       If everything went well, send the list of documents with the
       correct HTTP status code and content type.
       */
      res.status(200).json(passwords);
    }
  });
};

module.exports.findById = function(req, res, next) {
  Password.find(req.params.id, function(err, password) {
    if(err) {
      /*
       If an unexpected error occurs, forward it to Express error
       middleware which will send the error properly formatted.
       */
      next(err);
    } else {
      /*
       If everything went well, send the fetched debt with the correct
       HTTP status.
       */
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



  Password.create(pass, function(err, password) {
    if(err) {
      /*
       If an unexpected error occurs, forward it to Express error
       middleware which will send the error properly formatted.
       */
      next(err);
    } else {
      /*
       If everything went well, send the newly created debt with the
       correct HTTP status.
       */
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
      /*
       If an unexpected error occurs, forward it to Express error
       middleware which will send the error properly formatted.
       */
      next(err);
    } else if(!password) {
      /*
       If there was no unexpected error, but that the document has not
       been found, send the legitimate status code. `debt` is null.
       */
      res.sendStatus(404);
    } else {
      /*
       `Debt.updateAttributes` sends a request to the Data System to
       update the document, given its ID and the fields to update.
       */
      password.updateAttributes(pass, function(err, password) {
        if(err) {
          /*
           If an unexpected error occurs, forward it to Express
           error middleware which will send the error properly
           formatted.
           */
          next(err);
        } else {
          /*
           If everything went well, send the fetched debt with the
           correct HTTP status.
           */
          res.status(200).send(password);
        }
      });
    }

  });
};

module.exports.destroy = function(req, res, next) {
  Password.destroy(req.params.id, function(err) {
    if(err) {
      /*
       If an unexpected error occurs, forward it to Express error
       middleware which will send the error properly formatted.
       */
      next(err);
    } else {
      /*
       If everything went well, send an empty response with the correct
       HTTP status.
       */
      res.sendStatus(204);
    }
  });
};