import React , {useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ViewCart.css'


export default function ViewCart() {

    let cartItems  = useSelector(state=> state.cartItemsReducer.cartItems)
    let [ bill , setBill ] = useState( cartItems.reduce( ( accum , current ) => ( accum + current.price ) , 0))


  return (

  <div className='viewCart-component container'>
    <div className="shopping-basket">
        <h1 className='mb-0'>shopping basket</h1>
    </div>

    <div className="card-content-grid">
        <div className="card-content-heading d-none d-sm-block">
            #Number
        </div>
        <div className="card-content-heading">
            <p className="mb-0">Product Description</p>
        </div>
        <div className="card-content-heading">
            Amount
        </div>
    </div>

    {cartItems.map((el,ind) => 
                    
        <div className="card-content-grid" key={ind}>
            <div className="card-content-number d-none d-sm-flex align-items-center justify-content-center ">
                <h3 className="text-danger">{ind+1}</h3>
            </div>
            <div className="card-content-description d-flex">
                <img src= {el.image} alt="" width="100px" />
                <div className="card-content-description-inner ms-3">
                    <h5>{el.title}</h5>
                    <span>{el.quantity} x PKR {el.price / el.quantity}</span>
                </div>
            </div>
            <div className="card-content-amount text-danger fs-5">
                    PKR {el.price}
            </div>
        </div>
    )}
        <div className="d-flex fs-4 p-2 justify-content-end">
            <p className="me-2">Total Amount : </p>
            <p className="text-end text-danger"> PKR  {bill} </p>
        </div>
        <Link to="/checkout"><button className="order-btn">Proceed to checkout</button></Link>
        
  </div>
  );
}

