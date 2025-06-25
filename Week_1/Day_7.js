// Day 7: Conditional Operators: Use $cond, $ifNull, $switch. 

// ! $cond

[
    {
      $project: {
        amount: 1,
        status: {
          $cond: {
            if: {
              $gt: ["$price", 10000],
            },
            then: "High values",
            else: "normal",
          },
        },
      },
    },
  ]

Output 

[
    {
      "_id": 6,
      "status": "High values"
    },
    {
      "_id": 10,
      "status": "normal"
    },
    {
      "status": "normal"
    },
  ]
  
// ! $ifNull

[
    {
      $project: {
        name: 1,
        price: 1,
        stock: 1,
        category: { $ifNull: ["$category", "Unknown"] },
        ratings: 1
      }
    }
  ]

Output

[
    {
      "_id": 6,
      "name": "Product 6",
      "price": 10000,
      "stock": 10,    
        "category": "Unknown",
        "ratings": 4.5
    },
]

// ! $switch

[
    {
      $project: {
        name: 1,
        category: 1,
        price: 1,
        stock: 1,
        priceCategory: {
          $switch: {
            branches: [
              { case: { $gte: ["$price", 10000] }, then: "Premium Product" },
              { case: { $gte: ["$price", 5000] }, then: "Affordable" }
            ],
            default: "Budget"
          }
        }
      }
    }
  ]

Output 

[
    {
      "_id": 6,
      "name": "Monitor",
      "category": "Electronics",
      "price": 12000,
      "stock": 30,
      "priceCategory": "Premium Product"
    },
    {
      "name": "Table Lamp",
      "category": "Electronics",
      "price": 1200,
      "stock": 45,
      "priceCategory": "Budget"
    },
    {
      "_id": 10
    }
  ]
  

  