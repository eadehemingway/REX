import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style.css';
import './components/Nav/style.css';
import './components/ProfilePage/style.css';
import {Provider } from 'react-redux'
import { store } from './store/configStore';




// store.subscribe(()=> console.log(store.getState()))
// store.dispatch(increment(5))
ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));
