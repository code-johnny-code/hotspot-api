require('dotenv').config();
const {geoToH3, kRing, h3SetToMultiPolygon} = require('h3-js');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PW
  }});
const dbName = process.env.DB_NAME;

module.exports = {
  logPosition(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      const h3Resolution = 14;
      data.h3 = kRing(geoToH3(data.latitude, data.longitude, h3Resolution), 1);
      return client.connect(function() {
        const db = client.db(dbName);
        const collection = db.collection('position_logs');
        collection.insertOne(data, (err, result) => {
          response(result);
        }, () => client.close());
      });
    } else {
      response({'error': 'Unauthorized'})
    }
  },
  getUserLocations(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      return client.connect(function() {
        const db = client.db(dbName);
        const collection = db.collection('position_logs');
        const userLocationCursor = collection.find({userId: data.userId});
        const locations = [];
        userLocationCursor.forEach(loc => locations.push(loc), () => response(locations));
      });
    } else {
      response({'error': 'Unauthorized'})
    }
  },
  reportPositiveTest(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      return client.connect(function() {
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.findOneAndUpdate({userId: data.userId}, {$set: {positive: true, positiveDTG: data.timestamp}}, (err, result) => {
          response(result);
        }, () => client.close());
      });
    } else {
      response({'error': 'Unauthorized'})
    }
  },
  reportNegativeTest(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      return client.connect(function() {
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.findOneAndUpdate({userId: data.userId}, {$set: {positive: false, positiveDTG: null}}, (err, result) => {
          response(result);
        }, () => client.close());
      });
    } else {
      response({'error': 'Unauthorized'})
    }
  }
};
