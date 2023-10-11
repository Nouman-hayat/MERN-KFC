import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useSelector} from 'react-redux'
import Header from './components/header/Header';
import CreateJob from './components/createProduct/CreateProduct';
import UserProfile from './pages/userProfile/UserProfile'
import AdminPanel from './pages/adminPanel/AdminPanel';
import Login from './pages/login/Login';
function App() {

  let isLoggedIn = useSelector(state=> state.adminReducer.isLoggedIn)

  return (

      <Router>
      <div className="App">
        <div className="header-component">
        </div>
        <Switch>
          
          <Route exact path="/">
            {isLoggedIn? <AdminPanel/> : <Login/> }

          </Route>

          <Route exact path="/createProduct">
            {isLoggedIn? <><Header/><CreateJob/></> : <Login/>}

          </Route>

          <Route exact path="/user/profile/:slug">
            <Header/>
            <UserProfile/>
          </Route>

        </Switch>
 
      </div>
      </Router>
  )
}

export default App;
