# REXXXXXXXXXX

### to run the app for development

in public

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

# Actions

types written in camel case

## react hooks for redux

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
