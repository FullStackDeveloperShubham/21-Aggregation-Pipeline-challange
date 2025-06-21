// Grouping Data: Learn $group, $sum, $avg, $count. 

#Aggrigation

$group , $sum

 [
  {
    $group: {
      _id: "category",
      totalSalary: { $sum: "$price" }
    }
  }
]

OutPut
 
 {
  "_id": "category",
  "totalSalary": 399220
}


$avg

[
  {
    $group: {
      _id: "category",
      totalSalary: { $avg: "$price" }
    }
  }
]

OutPut
 
{
  "_id": "category",
  "totalSalary": 7984.4
}

Aggrigation Query

$count

[
  {
    $match: {
      category: "Electronics",
    },
  },
  {
    $count: "electronicsCount",
  },
]

OutPut
 
electronicsCount:19




