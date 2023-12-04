# Dsatabase Schema

## User Schema

```bson
{
    id: objectId(user_id), 
    username: {
        type: String
        required
    },
    name: {
        type: String,
        required
    }
    email: {
        type: String
        required
    },
    password: {
        type: String
    },
    isVerified: {
        type: boolean,
        default: false,
    },
    isAdmin: {
        type: boolean,
        default: false,
    },
    createdAt: timestamp,
    updatedAt: timestamp
} 
```

## Article Schema

```bson
{
    id: objectId(article_id),
    title: {
        type: String,
        required
    },
    content: String,
    author: ObjectId(useer_id)
    thumbnail: String,
    category: [],
    tags: [],
    views_count: {
        type: Int,
        default: 0
    },
    likes: {
        user: objectId(user_id),
        createdAt: timestamp
    },
    comments: {
        _id: objectId(comment_id),
        user: objectId(user_id),
        content: String
        createdAt: timestamp,
        updatedAt: timestamp)
    },
    createdAt: timestamp,
    updatedAt: timestamp
}
```

## Article Category Schema

```bson
{
    id: objectId(category_id),
    category_name: {
        type: String
        required
    },
    createdAt: timestamp,
    updatedAt: timestamp
}
```

