const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const Mongo = require('./mongoAPI');
require('dotenv').config();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/registerNewUser', (req, res) => {
  Mongo.registerNewUser(req.body, (results) => res.send(results))
});

app.post('/userLocations', (req, res) => {
  Mongo.getUserLocations(req.body, (results) => res.send(results))
});

app.post('/logPosition', (req, res) => {
  Mongo.logPosition(req.body, (results) => res.send(results));
});

app.post('/reportPositive', (req, res) => {
  Mongo.reportPositiveTest(req.body, (results) => res.send(results));
});

app.post('/reportNegative', (req, res) => {
  Mongo.reportNegativeTest(req.body, (results) => res.send(results));
});

app.post('/setGeofence', (req, res) => {
  Mongo.setGeofence(req.body, (results) => res.send(results));
});

app.get('/hotspots', (req, res) => {
  Mongo.getHotspots(req.body, (results) => res.send(results));
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Express server listening on %d, in %s mode', process.env.PORT, app.get('env'));
});
