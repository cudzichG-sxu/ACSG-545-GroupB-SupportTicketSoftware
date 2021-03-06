let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tickets').then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

let ticketSchema = require('./supportTicketSchema.js').ticketSchema;
let clientSchema = require('./supportTicketSchema.js').clientSchema;
let ticketModel = mongoose.model('taskModel', ticketSchema);
let clientModel = mongoose.model('timerModel', clientSchema);
const history = require('connect-history-api-fallback');



mongoose.connection.once('open', function() {
    app.use(express.json());

    app.post('/submitNewTicket', function(request, response) {
        var savePkg = request;
        console.log(savePkg.body.savePkg);
        if (savePkg.body === undefined) {
            console.log("THE DATA IS EMPTY!");
        } else {
            let details = JSON.parse(savePkg.body.savePkg);

            var newTicket = new ticketModel({
                description: details.description,
                ticketDate: details.ticketDate,
                assignee: details.assignee,
                clientId: details.clientId,
                assigner: details.assigner,
                status: details.status,
                comments: details.comments,

            });

            newTicket.save(function (err, doc) {
                if (err) {
                    console.log("error saving to database " + err);
                    response.status(404);
                    response.send(JSON.stringify(err));
                } else {
                    console.log("saved successfully to database " + doc);
                    response.status(200);
                    response.send(JSON.stringify(doc));
                }
            });
        }
    });

    app.get('/allTickets', function (req, res) {
        let clientIdActual = req.query.clientId;
        let ticketQuery = ticketModel.find({ clientId: { $eq: clientIdActual } })
        ticketQuery.exec(function(err, docs) {
            if(err) {
                console.log("error pulling from database " + err);
                res.status(404);
                res.send(JSON.stringify(err));
            } else {
                res.status(200);
                res.send(JSON.stringify(docs));
            }
        });
    });

    app.use('/deleteTicket', express.query());
    app.delete('/deleteTicket', function(request, response) {
        let deletePkg = ticketModel.deleteOne({_id: request.query.id});
        console.log(request.query);
        deletePkg.exec(function(err) {
            if(err) {
                console.log("error deleting from database" + err);
                response.status(404);
                response.send(JSON.stringify(err));
            } else {
                response.status(202);
                response.send(JSON.stringify({}));
            }
        })
    });

    app.get('/allClients', function (req, res) {
        var clientQuery = clientModel.find()
        clientQuery.exec(function(err, docs) {
            if(err) {
                console.log("error pulling from database " + err);
                res.status(404);
                res.send(JSON.stringify(err));
            } else {
                res.status(200);
                res.send(JSON.stringify(docs));
            }
        });
    });

    app.use(express.json());
    app.post('/newClient', function(request, response) {
        var savePkg = request;
        console.log(savePkg.body);
        if (savePkg.body === undefined) {
            console.log("THE DATA IS EMPTY!");
        } else {
            var newClient = new clientModel({
                ticketAmount: savePkg.body.ticketAmount,
                organization: savePkg.body.organization,
            });
            newClient.save(function (err, doc) {
                if (err) {
                    console.log("error saving to database " + err);
                    response.status(404);
                    response.send(JSON.stringify(err));
                } else {
                    console.log("saved successfully to database " + doc);
                    response.status(200);
                    response.send(JSON.stringify(doc));
                }
            });
        }
    });


    app.use('/deleteClient', express.query());
    app.delete('/deleteClient', function(request, response) {
        var deletePkg = clientModel.deleteOne({_id: request.query.id});
        console.log(request.query);
        deletePkg.exec(function(err) {
            if(err) {
                console.log("error deleting from database" + err);
                response.status(404);
                response.send(JSON.stringify(err));
            } else {
                response.status(202);
                response.send(JSON.stringify({}));
            }
        })
    });

    app.use(express.static('supportTicketSoftware/dist/supportTicketSoftware/'));
    app.use(history({
        disableDotRule: true,
        verbose: true
    }));
    app.use(express.static('supportTicketSoftware/dist/supportTicketSoftware/'));
    app.get('/', function(req, res) {
        res.render(path.join(__dirname + '/dist/index.html'));
    });

    app.listen(8080, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Application launched and running");
        }
    })
});