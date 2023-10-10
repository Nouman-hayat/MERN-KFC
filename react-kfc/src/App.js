import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route ,
  useLocation
} from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Home from './pages/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './pages/categoryPage/CategoryPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProductDetail from './pages/productDetail/ProductDetail';
import { OrderListProvider } from './OrderedItems';
import { UserInfoProvider } from './userInfo';
import Shipping from './pages/shipping/Shipping';
import Payment from './pages/payment/Payment';
import ViewCart from './pages/viewCart/ViewCart';
import Checkout from './pages/checkout/Checkout';
import ProtectRoute from './components/protectRoute/ProtectRoute';
import OrderComplete from './components/OrderComplete';
import ScrollToTop from './components/ScrollToTop';

const stripePromise = loadStripe('pk_test_51JmH5OGFsyW28IZDENWS0plIwH9VnoIX9rikZCKXPSOlsssryHEmaFimAdqfUHxKXwmBdwqpWNrc6JvUDDP60Rb000bYTEgOha');

function App() {

  return (
    <div className="App">
      <OrderListProvider>

      <Router>
        <ScrollToTop/>
        <UserInfoProvider>

          <Header/>
   
          <Switch>

            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route exact path="/category/:slug">
              <UserInfoProvider>
              <ProductPage/>
              </UserInfoProvider>
            </Route>

            <Route exact path="/product/:slug">
              <ProductDetail/>
            </Route>

            <Route exact path="/login">
                <Login/>
            </Route>

            
            <Route exact path="/register">
              <Register/>
            </Route>

            <Route exact path="/viewCart">
              <ProtectRoute component = {ViewCart} />
            </Route>

            <Route exact path="/checkout">
              <ProtectRoute component = {Checkout} />
            </Route>

            <Route exact path="/ordercomplete">
              <ProtectRoute component = {OrderComplete} />
            </Route>

            <Route exact path="/payment">
              <Elements stripe={stripePromise}>
                <ProtectRoute component = {Payment} />
              </Elements>
            </Route>
            
            <Route exact path="*">
              <h1 className="text-center my-5">404 <br /> Page not found</h1>
            </Route>
            
          </Switch>
          <Footer/>

        </UserInfoProvider>
      </Router>
      </OrderListProvider>
    </div>

  );
}

export default App;
