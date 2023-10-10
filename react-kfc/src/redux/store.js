import {createStore ,combineReducers} from 'redux'
import {counterReducer} from './reducers/counterReducer'
import {productsReducer} from './reducers/productsReducer'
import {cartItemsReducer} from './reducers/cartItemsReducer'
import {userReducer} from './reducers/userReducer'

let allReducers = combineReducers({
    counterReducer,
    productsReducer,
    cartItemsReducer,
    userReducer
}) 

let localCartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

let initialCartItems = {cartItemsReducer:{
    cartItems :  localCartItems
}}

export const store = createStore(allReducers , initialCartItems ,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


