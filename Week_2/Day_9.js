// Day 9: Pipeline in Lookup: Join and filter only completed orders.

MongoDB's $lookup is powerful for performing JOIN-like operations between collections. But many developers stop at basic lookups without realizing you can also filter joined documents using the pipeline feature.

In today's guide, you'll learn how to:

✅ Join two collections using $lookup with a pipeline.
✅ Filter only completed orders within the lookup itself.
✅ Keep your query efficient and avoid unnecessary post-processing

Why Use Pipeline Inside $lookup?
Traditional $lookup joins all matching documents, leaving you to filter afterward. But:

❌ Pulling large datasets hurts performance.
❌ You filter results after bringing unwanted data.

With $lookup + pipeline, you:

✅ Filter during the join.
✅ Only relevant documents get joined.
✅ Improve speed and reduce memory usage.

Collections:

users

{
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@example.com"
  }
  

orders

{
    _id: ObjectId("..."),
    userId: ObjectId("..."),
    amount: 150,
    status: "completed" // or "pending", "canceled"
  }
  
// !   Basic $lookup with Pipeline

db.users.aggregate([
    {
      $lookup: {
        from: "orders",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$userId", "$$userId"] },
                  { $eq: ["$status", "completed"] }
                ]
              }
            }
          }
        ],
        as: "completedOrders"
      }
    }
  ])

  Step-by-Step Breakdown
✅ from: Target collection — orders.
✅ let: Pass current user._id as userId.
✅ pipeline: Filter during join:
✔ Match orders where userId matches.
✔ Only status: "completed" orders allowed.
✅ as: Store results in completedOrders array.

// ! Result Example

{
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@example.com",
    completedOrders: [
      { _id: ObjectId("..."), userId: ObjectId("..."), amount: 150, status: "completed" },
      { _id: ObjectId("..."), userId: ObjectId("..."), amount: 200, status: "completed" }
    ]
  }