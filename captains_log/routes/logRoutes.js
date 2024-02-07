const express = require('express');
const router = express.Router();
const Log = require('../models/Log.js');

// Index Route
router.get('/', (req, res, next) => {
    Log.find({})
        .then(allLogs => res.render('Index', { logs: allLogs }))
        .catch(next);
});

// Show Route
router.get('/:id', (req, res, next) => {
    Log.findById(req.params.id)
        .then(foundLog => res.render('Show', { log: foundLog }))
        .catch(next);
});

// New Route
router.get('/new', (req, res) => {
    res.render('new');
});

// Create Route
router.post('/', (req, res, next) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    Log.create(req.body)
        .then(createdLog => res.redirect(`/logs/${createdLog._id}`))
        .catch(next);
});

// Edit Route
router.get('/:id/edit', (req, res, next) => {
    Log.findById(req.params.id)
        .then(foundLog => res.render('Edit', { log: foundLog }))
        .catch(next);
});

// Update Route
router.put('/:id', (req, res, next) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    Log.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/logs/${req.params.id}`))
        .catch(next);
});

// Delete Route
router.delete('/:id', (req, res, next) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/logs'))
        .catch(next);
});

module.exports = router;
