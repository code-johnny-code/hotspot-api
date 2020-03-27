const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const Mongo = require('./mongoAPI');
require('dotenv').config();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/logPosition', (req, res) => {
  Mongo.logPosition(req.body, (results) => res.send(results));
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Express server listening on %d, in %s mode', process.env.PORT, app.get('env'));
});
