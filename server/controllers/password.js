var express = require('express');
var router = express.Router();
var Password = require('../models/password');

// Create a new debt
router.post('/passwords', function(req, res, next) {
    Password.create(req.body, function(err, password) {
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
});


// Fetch an existing debt
router.get('/passwords/:id', function(req, res, next) {
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
});


// Update an existing debt
router.put('/passwords/:id', function(req, res, next) {
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
            password.updateAttributes(req.body, function(err, password) {
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
});


// Remove an existing debt
router.delete('/passwords/:id', function(req, res, next) {
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
});


// List of all debts, for a given creditor
router.get('/passwords', function(req, res, next) {
    Password.request('all', null, function(err, passwords) {
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
            res.status(200).json(passwords);
        }
    });
});


// Export the router instance to make it available from other files.
module.exports = router;