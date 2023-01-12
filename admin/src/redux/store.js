import { createStore , combineReducers} from "redux";
import {adminReducer} from './reducers/adminReducer'

let allReducers = combineReducers({
    adminReducer
})

let localAdmin = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) :{isLoggedIn : false , admin:{_id:"",email:"",password:"" , __v:"0"}}

let initialState = {adminReducer : localAdmin }


export const store = createStore(allReducers, initialState ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())