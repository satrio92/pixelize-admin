# Dsatabase Schema

## User Schema

```bson
{
    user_id: {
      type: String,
      default: () => mongoose.Types.ObjectId().toString(),
    },
    username: {
        type: String
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
    email: {
        type: String
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    updatedAt: Date
} 
```

## Article Schema

```bson
{
    id: objectId(user_id), 
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

## Blacklisted Token Schema

```bson
{
    id_: objectId(),
    token: {
        type: String,
        unique: true
    }
}
```