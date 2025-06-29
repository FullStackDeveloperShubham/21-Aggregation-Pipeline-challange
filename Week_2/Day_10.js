// Day 10: Nested Documents: Get comment counts for each post.

Example: Posts with Embedded Comments

{
    _id: ObjectId("postId"),
    title: "Mastering MongoDB",
    comments: [
      { user: "Alice", text: "Great post!" },
      { user: "Bob", text: "Very helpful." }
    ]
  }
  
  Get Post with Comment Count Using $project:

  db.posts.aggregate([
    {
      $project: {
        title: 1,
        commentCount: { $size: "$comments" }
      }
    }
  ])
  
  Result:

  {
    _id: ObjectId("postId"),
    title: "Mastering MongoDB",
    commentCount: 2
  }
  