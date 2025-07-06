1️⃣ $search (Atlas Full-Text Search) — 🔍 Powerful & Scalable
✅ Available on MongoDB Atlas

✅ Built on Apache Lucene

✅ Supports advanced features:

Fuzzy Search (typo-tolerant)

Relevance scoring

Phrase/Proximity search

Language-specific stemming

db.collection.aggregate([
    {
      $search: {
        index: "default",  // Name of your Atlas Search index
        text: {
          query: "mongodb search tutorial",
          path: ["title", "description"]  // Fields to search
        }
      }
    }
  ]);
  
  2️⃣ $regex — Simple Pattern Matching
  ✅ Native to MongoDB Core
  
  ✅ Supports basic wildcard or partial matches

  db.collection.find({
    title: { $regex: "mongo", $options: "i" }  // Case-insensitive search
  });
  
  Notes:
⚠️ Slower on large datasets without proper indexing
⚠️ Cannot leverage Atlas Search features like scoring or fuzzy matching