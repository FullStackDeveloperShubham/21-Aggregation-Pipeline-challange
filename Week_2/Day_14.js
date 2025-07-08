🔎 1. $filter – Filter items from an array

Use case: Keep only items that match a condition.

{
    $project: {
      passedScores: {
        $filter: {
          input: "$scores",
          as: "score",
          cond: { $gte: ["$$score", 60] }
        }
      }
    }
  }
  
  ✅ Filters out scores < 60.

  🔄 2. $map – Transform every item in an array

  Use case: Add a prefix to tags.

  {
    $project: {
      prefixedTags: {
        $map: {
          input: "$tags",
          as: "tag",
          in: { $concat: ["#tag_", "$$tag"] }
        }
      }
    }
  }
  
  ✅ Converts ["tech", "ai"] → ["#tag_tech", "#tag_ai"].

  ➕ 3. $reduce – Accumulate values from an array

  Use case: Sum values or build strings.

  {
    $project: {
      total: {
        $reduce: {
          input: "$expenses",
          initialValue: 0,
          in: { $add: ["$$value", "$$this"] }
        }
      }
    }
  }

  ✅ Sums up numbers in the expenses array.

  Real-life Example: Student Grades
  

  {
    $project: {
      name: 1,
      passedSubjects: {
        $filter: {
          input: "$subjects",
          as: "sub",
          cond: { $gte: ["$$sub.score", 50] }
        }
      },
      totalScore: {
        $reduce: {
          input: "$subjects",
          initialValue: 0,
          in: { $add: ["$$value", "$$this.score"] }
        }
      }
    }
  }
  
  🧠 Bonus Tips:
$filter = keep only needed items

$map = modify each item

$reduce = combine all items into one