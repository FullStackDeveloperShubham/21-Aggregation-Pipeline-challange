// Day 1

// Day 1: Introduction to Aggregation: Use $match and $project on a users collection.

#Aggrigation Query 

// $match
[
    {
      $match: {
        "address.state":"Maharashtra"
      },
    },
]

Output : 

{
    "_id": 10,
    "name": "Summer",
    "email": "samanthanorris@yahoo.com",
    "address": {
      "city": "Mumbai",
      "state": "Maharashtra"
    }
  },
  {
    "_id": 12,
    "name": "Wendy",
    "email": "imorris@yahoo.com",
    "address": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "alternateEmail": "marcus07@gmail.com"
    }
  },

// #$project

[
    {
      $project: {
        name:"Christina",
        email:"douglasjohnson@yahoo.com",
      }
    }
]

Output : 

[
    {
      "_id": 1,
      "name": "Christina",
      "email": [
        "douglasjohnson@yahoo.com",
        "douglasjohnson@yahoo.com"
      ]
    },
    {
      "_id": 2,
      "name": "Christina"
    }
  ]
  