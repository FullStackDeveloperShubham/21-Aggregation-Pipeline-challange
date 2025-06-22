Day 4: Sorting & Limiting: Use $sort, $limit, $skip.

// ! @Skip 

Aggrigation Query 

[
  {
    $sort: {
      _id: -1,
    },
  },
  {
    $skip: 1
  }
]
output :
  
  50 Number Document is skipped
  
 {
  "_id": 49,
  "name": "Christina",
  "email": "martinezwilliam@hotmail.com",
  "address": {
    "state": "Maharashtra",
    "city": "Mumbai"
  }
}

// ! @sort

[
    {
      $sort: {
        _id: -1
      }
    }
  ]

output :

[
    {
      "_id": 50,
      "name": "Ronald",
      "email": "morrisgary@hotmail.com",
      "address": {
        "city": "Mumbai",
        "state": "Maharashtra"
      }
    },
    {
      "_id": 49,
      "name": "Christina",
      "email": "martinezwilliam@hotmail.com",
      "address": {
        "city": "Mumbai",
        "state": "Maharashtra"
      }
    }
  ]

//   ! $limit 
[
    {
      $sort: {
        _id: -1
      }
    },
    {
      $limit: 2
    }
  ]

output : 

[
    {
      "_id": 50,
      "name": "Ronald",
      "email": "morrisgary@hotmail.com",
      "address": {
        "city": "Mumbai",
        "state": "Maharashtra"
      }
    },
    {
      "_id": 49,
      "name": "Christina",
      "email": "martinezwilliam@hotmail.com",
      "address": {
        "city": "Mumbai",
        "state": "Maharashtra"
      }
    }
  ]
  
  
  