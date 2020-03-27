const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const Mongo = require('./mongoAPI');
require('dotenv').config();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// {"userId": "", "key": ""}
app.post('/userLocations', (req, res) => {
  Mongo.getUserLocations(req.body, (results) => res.send(results))
});

// {"accuracy": 1, "altitude": 1, "heading": 0, "key": "", "latitude": 12.34, "longitude": -12.347, "speed": 0, "userId": ""}
app.post('/logPosition', (req, res) => {
  Mongo.logPosition(req.body, (results) => res.send(results));
});

// {"userId": "", "key": "", "timestamp": 1234567890}
app.post('/reportPositive', (req, res) => {
  Mongo.reportPositiveTest(req.body, (results) => res.send(results));
});

// {"userId": "", "key": ""}
app.post('/reportNegative', (req, res) => {
  Mongo.reportNegativeTest(req.body, (results) => res.send(results));
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Express server listening on %d, in %s mode', process.env.PORT, app.get('env'));
});
