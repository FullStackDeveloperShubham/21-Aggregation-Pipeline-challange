1. $match: Filtering Documents
Purpose:
Filters documents based on a condition—like a WHERE clause in SQL.

Position in Pipeline:
Usually near the start to reduce the number of documents early and improve performance.

Syntax:

{ $match: { field: value, ... } }

Operators you can use:
$eq, $ne, $gt, $lt, $in, $and, $or, $regex, etc.

Example Use Case:

{ $match: { category: "Electronics", inStock: true } }

This filters only those documents where category is "Electronics" and inStock is true.

🔍 Internal Working:
MongoDB scans each document and checks if it satisfies the conditions. If it does, it passes it to the next stage. Otherwise, it's discarded.

2. $project: Reshape Output
Purpose:
Specifies what fields to include or exclude in the output documents.

Use cases:

Exclude sensitive data (e.g., passwords).

Rename fields.

Format or reshape data for the frontend/API.

Include computed values (when used after $addFields).

{ $project: { field1: 1, field2: 1, _id: 0 } }

1 means include

0 means exclude

Cannot mix 0 and 1 together except for _id

Example Use Case:


{ $project: { name: 1, price: 1, _id: 0 } }

This will include name and price, and remove _id from the result.

3. $addFields: Add or Modify Fields
Purpose:
Used to add new fields or modify existing fields in each document.

Difference from $project:

$addFields doesn’t remove fields—it just adds or updates.

$project can reshape/remove fields.

Syntax:

{
    $addFields: {
      newField: expression,
      anotherField: expression2
    }
  }
  
  Example Use Case:

  {
    $addFields: {
      finalPrice: {
        $subtract: [
          "$price",
          { $multiply: ["$price", "$discount"] }
        ]
      }
    }
  }
  
  Putting It All Together: Step-by-Step Breakdown

  db.products.aggregate([
    {
      $match: {
        category: "Electronics",
        inStock: true
      }
    },
    {
      $addFields: {
        finalPrice: {
          $subtract: [
            "$price",
            { $multiply: ["$price", "$discount"] }
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        category: 1,
        price: 1,
        finalPrice: 1
      }
    }
  ])
  
  Step 1: $match
  Filters out non-Electronics and out-of-stock items.
  [
    { "name": "Laptop", "category": "Electronics", "inStock": true },
    { "name": "Shoes", "category": "Fashion", "inStock": false },
    { "name": "Smartphone", "category": "Electronics", "inStock": true }
  ]
  
  [
    { "name": "Laptop", ..., "price": 80000, "discount": 0.1 },
    { "name": "Smartphone", ..., "price": 60000, "discount": 0.15 }
  ]
  
  Step 2: $addFields

  Adds a new field finalPrice for each matched document.

  finalPrice = 80000 - (80000 * 0.1) = 72000

  finalPrice = 60000 - (60000 * 0.15) = 51000

  Step 3: $project

  Keeps only the required fields: name, category, price, finalPrice.

  [
    {
      "name": "Laptop",
      "category": "Electronics",
      "price": 80000,
      "finalPrice": 72000
    },
    {
      "name": "Smartphone",
      "category": "Electronics",
      "price": 60000,
      "finalPrice": 51000
    }
  ]
  