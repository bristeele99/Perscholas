const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    Title: {type: String},
    Entry: {type: String},
    shipIsBroken: Boolean
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;