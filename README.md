# REXXXXXXXXXX

### to run the app for development

in client

```
npm run build:watch
```

in server

```
npm start
```

go to http://localhost:3000

### State

Our current state structure is

```
{
signedIn: boolean,
signedInUser: string,
userBeingViewed: string
}
```

The userBeingViewed refers to the user whose page you are looking at, when you sign in it gets assigned as default to the signed in user, but if you search for another user it gets updated to that user.

### Actions

types written in camel case. Currently all actions are in one actions file because there are so few of them.

### End points

front end:

```
/ = LandingPage
/signup = Signup
/signin = Signin
/user/:id = ProfilePage (the same component for your own home page as other peoples pages)
/recommendations = Recommendations
```

### Protected Routes

When we log in a jwt is created and the redux store is updated to say signedin = true.
We use <ProtectedRoute> component for protected routes, this checks the redux store, and if it says the user is signed in it allows the user to go to that page.

What appears on that page will depend on if the user has a jwt or not. In the backend when data is asked for (e.g. data on a user) we have middleware isAuthenticated which checks to see if a jwt exists, and it only returns data if they is a jwt.

#### side note - react hooks for redux

```
import React, { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../../actions/actions'

const Test = () => {
  const selectedData = useSelector(state=> state.counter)
  const dispatch = useDispatch()
  console.log(" HOOOOOK WORKING ", selectedData)
  return (<button onClick={()=> dispatch(increment(5))}>hoook upppp</button>)
}
```
