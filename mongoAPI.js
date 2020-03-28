require('dotenv').config();
const {geoToH3, h3ToGeoBoundary} = require('h3-js');
const moment = require('moment');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PW
  }});
const dbName = process.env.DB_NAME;

module.exports = {
  registerNewUser(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      client.connect(() => {
        const db = client.db(dbName);
        const collection = db.collection('users');
        return collection.insertOne({userId: data.userId, deviceId: data.deviceId, positive: false, positiveDTG: null},
          function (error, res) {
          if(error) {
            response({'error': res});
          } else {
            response(res);
          }
        })
      })
    } else {
      response({'error': 'Unauthorized'})
    }
  },
  logPosition(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      const h3Resolution = 14;
      data.h3 = geoToH3(data.latitude, data.longitude, h3Resolution);
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
  },
  setGeofence(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      return response('Not yet implemented')
    } else {
      response({'error': 'Unauthorized'})
    }
  },
  // Get list of userId with positive results, pull their position records, filter out any position records older than
  // 2-weeks or where they were travelling faster than average walking speed (indicates a stop and not just driving),
  // return the H3 cells that they frequented while probably infectious.
  getHotspots(data, response) {
    if (data.key === process.env.API_KEY) {
      delete data.key;
      return client.connect(function () {
        const db = client.db(dbName);
        const collection = db.collection('users');
        // Find all user records that have tested positive
        collection.find({positive: true}).toArray((err, positiveUsers) => {
          const positiveIds = positiveUsers.map(user => user.userId);
          const collection = db.collection('position_logs');
          // Find Position Reports from users with Positive Test results, where the speed was lower than 2 mps (walking speed)
          collection.find({userId : {$in: positiveIds}, speed: {$lt: 2} }).toArray((err, positiveLocations) => {
            // Filter out position records older than 2 weeks from the timestamp of the positive test result report
            const filteredPositiveLocations = positiveLocations.filter(report => {
              const positiveTestTimestamp = moment(positiveUsers.find(user => user.userId === report.userId).positiveDTG);
              const eventTimestamp = moment(report.timestamp);
              const twoWeekWindowStart = moment(positiveTestTimestamp).subtract(2, 'weeks');
              report.timestamp = twoWeekWindowStart;
              return eventTimestamp.isAfter(twoWeekWindowStart)
            });
            const h3Lists = filteredPositiveLocations.map(locationReport => locationReport.h3);
            const h3ListsFlat = [].concat.apply([], h3Lists);
            const hotspotH3s = [...new Set(h3ListsFlat)];
            // TODO: Add hotspot activation timestamp (first and latest?)
            const hotspotIdsWithGeo = hotspotH3s.map(h3_index => {
              return {h3: h3_index, geometry: h3ToGeoBoundary(h3_index, true)}
            });
            return response(hotspotIdsWithGeo);
          });
        });
      });
    } else {
      response({'error': 'Unauthorized'})
    }
  }
};
