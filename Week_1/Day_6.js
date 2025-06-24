// ! Day 6: Working with Dates: Group orders by month/year using $year, $month.

// ! Aggregation to Group by Month/Year

Query 


[
    {
      $group: {
        _id: {
          year: { $year: { $toDate: "$date" } },
          month: { $month: { $toDate: "$date" } }
        }
      }
    }
  ]

  
Output 

{
    "_id": {
      "year": 2024,
      "month": 6
    }
  }
  

