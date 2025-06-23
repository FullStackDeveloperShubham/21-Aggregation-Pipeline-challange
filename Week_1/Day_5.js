// Day 5: Unwinding Arrays: Learn $unwind on a item array.

In MongoDB, $unwind is used in aggregation pipelines to deconstruct an array field, outputting a document for each element of the array.

Why $unwind?

If you have a document like:


{
  title: "Learn MongoDB",
  tags: ["database", "nosql", "mongodb"]
}
Running $unwind on tags transforms it into:


{ title: "Learn MongoDB", tags: "database" }
{ title: "Learn MongoDB", tags: "nosql" }
{ title: "Learn MongoDB", tags: "mongodb" }
This is useful for:
✅ Flattening arrays
✅ Filtering or grouping based on array values
✅ Simplifying further operations

Basic $unwind Example

db.posts.aggregate([
  { $unwind: "$tags" }
])
Each array element becomes its own document copy with a single tags value.

Optional Parameters

{ 
  $unwind: {
    path: "$tags",
    preserveNullAndEmptyArrays: true
  }
}
✅ preserveNullAndEmptyArrays: Keeps documents with no tags or empty arrays instead of discarding them.

// ! Aggrigation Pipeline Example
[
    {
      $unwind: {
        path: "$items",                     // The array field to unwind
        includeArrayIndex: "index",         // (Optional) Adds the array index as a new field
        preserveNullAndEmptyArrays: true    // (Optional) Keeps documents with no array or empty array
      }
    }
  ]

  
// ! Output 

{
    "total": 900,
    "date": "2024-06-13T12:00:00Z",
    "index": 0,
    "_id": 105,
    "userId": 2,
    "items": {
      "productId": 5,
      "quantity": 10
    }
  }
  
