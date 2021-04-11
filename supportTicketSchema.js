var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    description: {type: String, required: true,},
    ticketDate: {type: String, required: true},
    assignee: {type: Array, required: true},
    clientId: {type: String, required: true},
    assigner: {type: Array, required: true},
    status: {type: String},
    comments: {type: Map},
}, {collection: 'tickets'});

var clientSchema = new Schema({
    ticketAmount: {type: Number},
    organization: {type: String, required: true},
}, {collection: 'clients'});

exports.ticketSchema = ticketSchema;
exports.clientSchema = clientSchema;