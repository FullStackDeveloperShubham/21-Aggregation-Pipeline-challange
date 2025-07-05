What is $facet?
$facet is a powerful aggregation stage in MongoDB that lets you run multiple pipelines in parallel on the same dataset and get all the results in a single response.

Perfect for dashboards where you need different aggregations, counts, and summaries together.


Use-Case: Dashboard Example with $facet

{
    _id: ObjectId("..."),
    status: "Completed", // Possible values: "Pending", "Completed", "Cancelled"
    amount: 250,
    customer: "John Doe",
    createdAt: ISODate("2025-07-03T12:00:00Z")
  }
  
  Example Aggregation with $facet

  db.orders.aggregate([
    {
      $facet: {
        totalSales: [
          { $match: { status: "Completed" } },
          { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ],
        ordersByStatus: [
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ],
        dailyOrders: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              count: { $sum: 1 }
            }
          },
          { $sort: { "_id": 1 } }
        ]
      }
    }
  ])
  
  Sample Output

  [
    {
      totalSales: [ { _id: null, totalAmount: 12500 } ],
      ordersByStatus: [
        { _id: "Completed", count: 50 },
        { _id: "Pending", count: 10 },
        { _id: "Cancelled", count: 5 }
      ],
      dailyOrders: [
        { _id: "2025-07-01", count: 15 },
        { _id: "2025-07-02", count: 25 },
        { _id: "2025-07-03", count: 25 }
      ]
    }
  ]
  
  Quick Tips
$facet pipelines run in parallel internally

Results are always returned as an array of objects per facet

Combine with $match, $group, $sort, $project as needed

