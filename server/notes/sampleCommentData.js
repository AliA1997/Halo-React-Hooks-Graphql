`
mutation {
	createComment(
    commentForm:{
        username: "AA",
        avatar: "https://www.shareicon.net/download/2015/09/20/104335_avatar.svg",
        body: "Sample Comment",
        dateCreated: "05/30/2019"
    },
    postId:"HX6gQ2kIst44aoaBwjP6"
  )
  {
    id
    username
    avatar
    body
    dateCreated
    dateUpdated
    deletedInd
    permanentlyDeletedInd
    postId
  }
}
`

`
mutation {
  updateComment(
    commentForm: {
      postId:"HX6gQ2kIst44aoaBwjP6",
      username:"AA",
      avatar: "https://www.shareicon.net/download/2015/09/20/104335_avatar.svg",
      body:"Updated Comment!",
      dateCreated:"05/30/2019",
      dateUpdated:"05/31/2019"
    },
    commentId:"P2bWPP1Vrc20ewXehMvL"
  ) 
  {
    username
    avatar
    body
    dateCreated
    dateUpdated
  }
}
`

`
mutation {
  deleteComment(
    commentId:"pRrBbZFzlXudUaciMdm1",
    postId: "HX6gQ2kIst44aoaBwjP6",
    userId:"8U1x2fvx3CYWL3rp0ZQO"
  )
  {
    body
  }
}
`