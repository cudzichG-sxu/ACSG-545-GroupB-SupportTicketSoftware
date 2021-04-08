var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    ticketId: {type: Number, required: true, unique: true},
    description: {type: String, required: true,},
    ticketDate: {type: String, required: true},
    assignee: {type: Map, required: true},
    assigner: {type: Map, required: true},
    status: {type: String},
    comments: {type: Map},
}, {collection: 'tickets'});

var clientSchema = new Schema({
    clientId: {type: String, required: true, unique: true},
    ticketAmount: {type: Number},
    organization: {type: String, required: true},
}, {collection: 'clients'});

exports.ticketSchema = ticketSchema;
exports.clientSchema = clientSchema;