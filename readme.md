Example queries:
```
  query PostsByAuthor {
    author(id: 1) {
      firstName
      posts {
        title
      }
    }
  }
```

```
  query {
    hello
  }
```


```
mutation {
  upvotePost(postId: 1) {
    votes
  }
}
```