// Day 8: Lookup (Joins): Use $lookup, $unwind, $mergeObjects.

$lookup

[
  {
    $lookup: {
      from: "products",          // Your target collection
      localField: "productId",    // Field from 'orders' (integer)
      foreignField: " 105",        // Field from 'products' (integer)
      as: "productsDetails"
    }
  }
]

Ouput :
  
  {
  "_id": 6,
  "name": "Monitor",
  "category": "Electronics",
  "price": 12000,
  "stock": 30,
  "ratings": [5, 4, 5],
  "productsDetails": [
    {
      "_id": 6,
      "name": "Monitor",
      "category": "Electronics",
      "price": 12000,
      "stock": 30,
      "ratings": [5, 4, 5]
    },
    {
      "_id": 6,
      "name": "Monitor",
      "category": "Electronics",
      "price": 12000,
      "stock": 30,
      "ratings": [5, 4, 5]
    }
  ]
}

// $unwind

  [
  {
    $lookup: {
      from: "products",          // Your target collection
      localField: "productId",    // Field from 'orders' (integer)
      foreignField: " 105",        // Field from 'products' (integer)
      as: "productsDetails"
    }
  },
  {
    $unwind: "$productsDetails"
  }
]

{
  "price": 12000,
  "stock": 30,
  "ratings": [5, 4, 5],
  "productsDetails": {
    "_id": 6,
    "name": "Monitor",
    "category": "Electronics",
    "price": 12000,
    "stock": 30,
    "ratings": [5, 4, 5]
  }
}

// $placeRoot

$replaceRoot

  [
  {
    $lookup: {
      from: "products",
      localField: "productId",   // field in current collection
      foreignField: "6",       // field in 'products' collection
      as: "productDetails"
    }
  },
  {
    $unwind: "$productDetails"
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$productDetails", "$$ROOT"]
      }
    }
  },
  {
    $project: {
      productDetails: 0  // remove the extra 'productDetails' field after merging
    }
  }
]

Output 

{
  "name": "Monitor",
  "category": "Electronics",
  "price": 12000,
  "stock": 30,
  "ratings": [5, 4, 5],
  "_id": 6
}



