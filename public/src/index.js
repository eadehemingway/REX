import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import './style.css'
import './components/Nav/style.css'
import './components/ProfilePage/style.css'
import { store } from './store/configStore'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
