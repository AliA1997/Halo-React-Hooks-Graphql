////////////////////Query------------------------
`
query {
	getAllUsers{
    id
    username
		avatar 
    dateRegistered
  }
}
`
`
query {
  searchUsers(searchVal:"i"){
    id
    username 
    avatar
    dateRegistered
  } 
}
`
`
query {
  getUser(id:"8U1x2fvx3CYWL3rp0ZQO"){
    id
    username 
    avatar
    dateRegistered
    socialMediaInfo{
      facebook
    }
    friends
  } 
}
`

////////////////////MUtations------------------------
`
mutation {
    register(
                  registerForm: { 
                                              username:"AA", 
                                              password:"password", 
                                              avatar: "https://www.shareicon.net/download/2015/09/20/104335_avatar.svg", 
                                              age: 22, 
                                              dateRegistered:"05/30/2019"
                                                }
                    ) {
          
          username
    }
  }
`

`
mutation {
  updateUser(
    updateUserForm: {
        username: "AA",
        avatar: "https://www.shareicon.net/download/2015/09/20/104335_avatar.svg",
        age: 23,
        dateRegistered: "05/30/2019",
        dateUpdated: "05/31/2019"
    },
    userId:"8U1x2fvx3CYWL3rp0ZQO"
  )
  {
    id
    username
    avatar
    age
    dateRegistered
    dateUpdated
    deletedInd
    permanentlyDeletedInd
  }
}
`

`
mutation {
  updateSocialMedia(
    socialMediaForm:{
      type: "facebook",
      value: "facebookValue"
    },
    userId:"gvCQImiRfAy9SUQIoT5d",
    socialMediaId:"EUhbkhkGTvXAhUgDHMCm"
  )
{
  facebook
  instagram
  twitter
  linkedin
}
}
`
`
mutation {
  deleteUser(
    userId:"gQc23V4SLTKdmPOl9DiY"
  )
  {
    body
  }
}
`