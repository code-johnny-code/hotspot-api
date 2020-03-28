![HotSpot](https://repository-images.githubusercontent.com/250440145/0c952c80-7032-11ea-9f19-8a45a66b9cdf)

# HotSpot API
An Express/NodeJS API powering the HotSpot Mobile App.

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
        "_id": "5e7de3c57f411200179da215",
        "accuracy": 8.576000213623047,
        "altitude": 174.68255615234375,
        "heading": 0,
        "latitude": 39.12345678,
        "longitude": -90.12345678,
        "speed": 0,
        "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
        "h3": [
            "8e264294597059f",
            "8e2642945970597",
            "8e264294597296f",
            "8e26429459704b7",
            "8e26429459704a7",
            "8e264294597058f",
            "8e2642945970587"
        ]
    },
    {
        "_id": "5e7de8d27f411200179da216",
        "accuracy": 8.576000213623047,
        "altitude": 174.68255615234375,
        "heading": 0,
        "latitude": 39.12345678,
        "longitude": -90.12345678,
        "speed": 0,
        "userId": "2949dbdb-97e2-4786-b7fa-bd7e1c53cb66",
        "h3": [
            "8e264294597059f",
            "8e2642945970597",
            "8e264294597296f",
            "8e26429459704b7",
            "8e26429459704a7",
            "8e264294597058f",
            "8e2642945970587"
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
