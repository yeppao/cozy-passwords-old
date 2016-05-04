var express = require('express');
var router = express.Router();
var Password = require('../models/password');

// Create a new debt
router.post('/passwords', function(req, res, next) {
    res.sendStatus(204);
});


// Fetch an existing debt
router.get('/passwords/:id', function(req, res, next) {
    res.sendStatus(204);
});


// Update an existing debt
router.put('/passwords/:id', function(req, res, next) {
    res.sendStatus(204);
});


// Remove an existing debt
router.delete('/passwords/:id', function(req, res, next) {
    res.sendStatus(204);
});


// List of all debts, for a given creditor
router.get('/passwords', function(req, res, next) {
    res.sendStatus(204);
});


// Export the router instance to make it available from other files.
module.exports = router;