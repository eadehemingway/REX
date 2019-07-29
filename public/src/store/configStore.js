import {createStore, applyMiddleware} from 'redux'
import {allReducers} from  '../reducers'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'


const loggerMiddleware  = createLogger()
export const store = createStore(
        allReducers, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        // applyMiddleware(thunk, loggerMiddleware)
    )
