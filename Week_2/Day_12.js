What is Bucketing?
Bucketing = Grouping documents into defined ranges (bins) based on a field's value.
Use Case: Data analysis, histograms, grouping continuous data (like age, price, marks) into meaningful ranges.

1️⃣ $bucket — Manual Binning
You define explicit boundaries (ranges) for grouping.

Syntax:

{
    $bucket: {
      groupBy: "$<field>",
      boundaries: [min, ..., max],
      default: "Other",  // Optional group for out-of-range values
      output: {
        count: { $sum: 1 },
        // More aggregated fields
      }
    }
  }
  
  Example: Bucketing Users by Age

  db.users.aggregate([
    {
      $bucket: {
        groupBy: "$age",
        boundaries: [18, 30, 50, 70],
        default: "Other",
        output: {
          totalUsers: { $sum: 1 },
          averageSalary: { $avg: "$salary" }
        }
      }
    }
  ])
  
  2️⃣ $bucketAuto — Automatic Equal Distribution
  You specify the number of buckets, MongoDB distributes documents as evenly as possible.

  {
    $bucketAuto: {
      groupBy: "$<field>",
      buckets: <number>,
      output: {
        count: { $sum: 1 },
        // More fields...
      }
    }
  }
  
  Example: Auto-Binning Product Prices
  
  db.products.aggregate([
  {
    $bucketAuto: {
      groupBy: "$price",
      buckets: 4,
      output: {
        productCount: { $sum: 1 },
        averageRating: { $avg: "$rating" }
      }
    }
  }
])
