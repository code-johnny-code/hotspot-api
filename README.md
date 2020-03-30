![HotSpot](https://repository-images.githubusercontent.com/250440145/0c952c80-7032-11ea-9f19-8a45a66b9cdf)
Created for the Devpost COVID-19 Global Hackathon 1.0

# HotSpot API

An Express/NodeJS API powering the [HotSpot Mobile App](https://github.com/code-johnny-code/hotspot) and using a MongoDB instance (I used mLab.com).

### .env file
You'll need to set up a `.env` file in your project's root directory with the following keys and values:  

```
API_KEY=(whatever you want to use as your API key when communicating with the HotSpot App)
DB_URL=(the URL of your MongoDB instance, such as mongodb://ds#####.mlab.com:#####/hotspot)
DB_NAME=(MongoDB database name)
DB_USER=(MongoDB user name)
DB_PW=(MongoDB password)
PORT=(whichever port you want the service to run on)

```

## Endpoints

### Register new User ID
Accepts a new User ID and Device ID, adding it to the `users` Collection  

`POST /registerNewUser`  

POST Body Example
```
{"userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66", "key": "8d64bae3-1820-40fa-821b-4d187e8483ad", "deviceId": "h2b4yu5g24b5luy2345"}
```

Success Response Example

```
{
    "result": {
        "n": 1,
        "opTime": {
            "ts": "6808879239954169857",
            "t": 3
        },
        "electionId": "7fffffff0000000000000003",
        "ok": 1,
        "operationTime": "6808879239954169857",
        "$clusterTime": {
            "clusterTime": "6808879239954169857",
            "signature": {
                "hash": "8kowBfsgbYFvTLXSpS/QgPh135M=",
                "keyId": "6765988592729718785"
            }
        }
    },
    "connection": {
        "id": 0,
        "host": "ds213715.mlab.com",
        "port": 13715
    },
    "ops": [
        {
            "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
            "deviceId": "h2b4yu5g24b5luy2345",
            "positive": false,
            "positiveDTG": null,
            "_id": "5e7dff9888c7942731a819ae"
        }
    ],
    "insertedCount": 1,
    "insertedId": "5e7dff9888c7942731a819ae",
    "n": 1,
    "opTime": {
        "ts": "6808879239954169857",
        "t": 3
    },
    "electionId": "7fffffff0000000000000003",
    "ok": 1,
    "operationTime": "6808879239954169857",
    "$clusterTime": {
        "clusterTime": "6808879239954169857",
        "signature": {
            "hash": "8kowBfsgbYFvTLXSpS/QgPh135M=",
            "keyId": "6765988592729718785"
        }
    }
}
```
Failure Response Example
```
{}
```

***
### Log Position
Saves a user's position report to the database  

`POST /logPosition`  

POST Body Example
```
{"accuracy": 8.576000213623047, "altitude": 174.68255615234375, "heading": 0, "key": "8d64bae3-1820-40fa-821b-4d187e8483ad", "latitude": 39.12345678, "longitude": -90.12345678, "speed": 0, "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66", "timestamp": "1360002924000"}
```

Success Response Example

```
{
     "result": {
         "n": 1,
         "opTime": {
             "ts": "6808862154574266369",
             "t": 3
         },
         "electionId": "7fffffff0000000000000003",
         "ok": 1,
         "operationTime": "6808862154574266369",
         "$clusterTime": {
             "clusterTime": "6808862154574266369",
             "signature": {
                 "hash": "U8WNg9nyASWbRCz6gRaUTV6Q7k4=",
                 "keyId": "6765988592729718785"
             }
         }
     },
     "connection": {
         "id": 0,
         "host": "ds213715.mlab.com",
         "port": 13715
     },
     "ops": [
         {
             "accuracy": 8.576000213623047,
             "altitude": 174.68255615234375,
             "heading": 0,
             "latitude": 39.12345678,
             "longitude": -90.12345678,
             "speed": 0,
             "timestamp": "1360002924000",
             "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
             "h3": "8e264294597059f",
             "_id": "5e7df00e7f411200179da217"
         }
     ],
     "insertedCount": 1,
     "insertedId": "5e7df00e7f411200179da217",
     "n": 1,
     "opTime": {
         "ts": "6808862154574266369",
         "t": 3
     },
     "electionId": "7fffffff0000000000000003",
     "ok": 1,
     "operationTime": "6808862154574266369",
     "$clusterTime": {
         "clusterTime": "6808862154574266369",
         "signature": {
             "hash": "U8WNg9nyASWbRCz6gRaUTV6Q7k4=",
             "keyId": "6765988592729718785"
         }
     }
 }
```
***
### Retrieve Locations by User ID
Retrieve all location events from a specific User  

`POST /userLocations`  

POST Body Example
```
{"userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66", "key": "8d64bae3-1820-40fa-821b-4d187e8483ad"}
```

Success Response Example

```
[
    {
        "_id": "5e809f20d6ea780017459c39",
        "accuracy": 8.576000213623047,
        "altitude": 174.68255615234375,
        "heading": 0,
        "latitude": 38.42312643,
        "longitude": -90.54325765,
        "speed": 0,
        "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
        "timestamp": "1360002924000",
        "h3": "8e264294597059f",
        "h3_geom": [
            [
                38.42311450715813,
                -90.54324870098277
            ],
            [
                38.42312075841753,
                -90.54323343862283
            ],
            [
                38.4231347721246,
                -90.54323345469348
            ],
            [
                38.42314253457383,
                -90.54324873312827
            ],
            [
                38.42313628331449,
                -90.54326399549244
            ],
            [
                38.42312226960587,
                -90.54326397941757
            ]
        ]
    },
    {
        "_id": "5e809f20d6ea780017459c39",
        "accuracy": 8.576000213623047,
        "altitude": 174.68255615234375,
        "heading": 0,
        "latitude": 38.42312643,
        "longitude": -90.54325765,
        "speed": 0,
        "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
        "timestamp": "1360002924000",
        "h3": "8e264294597059f",
        "h3_geom": [
            [
                38.42311450715813,
                -90.54324870098277
            ],
            [
                38.42312075841753,
                -90.54323343862283
            ],
            [
                38.4231347721246,
                -90.54323345469348
            ],
            [
                38.42314253457383,
                -90.54324873312827
            ],
            [
                38.42313628331449,
                -90.54326399549244
            ],
            [
                38.42312226960587,
                -90.54326397941757
            ]
        ]
    }
]
```
***
### Report a Positive Test Result
Report that a User has received a Positive Test Result  

`POST /reportPositive`  

POST Body Example
```
{"userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66", "key": "8d64bae3-1820-40fa-821b-4d187e8483ad", "timestamp": 1318781876406}
```

Success Response Example

```
{
    "lastErrorObject": {
        "n": 1,
        "updatedExisting": true
    },
    "value": {
        "_id": "5e7dff9888c7942731a819ae",
        "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
        "positive": true,
        "positiveDTG": 1318781876406
    },
    "ok": 1,
    "operationTime": "6808897759853150209",
    "$clusterTime": {
        "clusterTime": "6808897759853150209",
        "signature": {
            "hash": "Po0eYTXq5VpQa27ifq047QK7zUs=",
            "keyId": "6765988592729718785"
        }
    }
}
```
***
### Report a Negative Test Result
Report that a User has received a Negative Test Result. Primarily used to negate an erroneous Positive Result that was previously reported.  

`POST /reportNegative`  

POST Body Example
```
{"userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66", "key": "8d64bae3-1820-40fa-821b-4d187e8483ad"}
```

Success Response Example

```
{
    "lastErrorObject": {
        "n": 1,
        "updatedExisting": true
    },
    "value": {
        "_id": "5e7dff9888c7942731a819ae",
        "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
        "positive": false,
        "positiveDTG": null
    },
    "ok": 1,
    "operationTime": "6808883973008130049",
    "$clusterTime": {
        "clusterTime": "6808883973008130049",
        "signature": {
            "hash": "IK1kJYxDm/fpF0R/tc7WyvOOOpA=",
            "keyId": "6765988592729718785"
        }
    }
}
```
***
### Get Active HotSpots
Retrieve the H3 ids and associated geometries of active HotSpots  

`GET /hotspots`  

Success Response Example

```
[
    {
        "h3": "8e264294597059f",
        "geometry": [
            [
                -90.54324870098277,
                38.42311450715813
            ],
            [
                -90.54323343862283,
                38.42312075841753
            ],
            [
                -90.54323345469348,
                38.4231347721246
            ],
            [
                -90.54324873312827,
                38.42314253457383
            ],
            [
                -90.54326399549244,
                38.42313628331449
            ],
            [
                -90.54326397941757,
                38.42312226960587
            ],
            [
                -90.54324870098277,
                38.42311450715813
            ]
        ]
    }
]
```
