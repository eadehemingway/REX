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
