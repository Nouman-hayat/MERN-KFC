import React , {useState} from 'react'
import './Payment.css'
import { useSelector ,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import {CardNumberElement , CardExpiryElement , CardCvcElement , useStripe , useElements} from '@stripe/react-stripe-js'
import { API_URL } from "../../api";

export default function Payment() {

    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    let cartItems  = useSelector(state=> state.cartItemsReducer.cartItems)
    let userInfo = useSelector( state => state.userReducer.user)
    let [bill,setBill] = useState(cartItems.reduce((accum,current) => accum + current.price , 0)) 
    console.log(cartItems)
    React.useEffect(()=>{
        setBill(cartItems.reduce((accum,current) => accum + (current.price * current.quantity) , 0))
    }, [cartItems])



    const handleSubmit = async (event) => {

        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
        
        let client_secret = await fetch(`${API_URL}/kfc/payment` , {
            method : 'POST' ,
            credentials : 'include' , 
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({bill})
        })
        .then(data => data.json())
        .then( ({client_secret}) => client_secret)


        stripe.confirmCardPayment( client_secret , {
            payment_method : {
                card : elements.getElement(CardNumberElement) ,
                billing_details : {
                    name : userInfo.firstName ,
                    email : userInfo.email
                }
            }
        })
    }

    let handleOrder = async ()=>{

        if(cartItems.length == 0 || bill < 250)
        {
            alert.error("Add more items to cart . Total bill must be atleast PKR 250")
            return
        }

        await fetch("http://localhost:8000/kfc/order" ,
         {method:"POST",
         credentials:'include',
         headers: {'Content-type':"application/json"}
         ,body: JSON.stringify({items: cartItems ,user:{_id:userInfo._id,name:userInfo.name, email:userInfo.email} , location: {city: "rawalpindi" , area : "kashmir road"} , bill})})
          .then(data=> data.json()).then(data => placedOrder(data))
    }

    let placedOrder = (data)=>{ //RUNS AFTER ORDER IS SENT TO SERVER AND RESPONSE IS RECIEVED
        console.log(data.message )
        if(data.message)
        alert.error(data.message)

        dispatch({type:"EMPTY_CART"})
    }

      

    return (
        <main className="payment-component container my-5">
            <section className="cart-contents my-5">
                <h2>Cart Items</h2>
                <div className="cart-content-grid-parent">
                <div className="card-content-grid">
                        <div className="card-content-heading">
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
                        <div className="card-content-number d-flex align-items-center justify-content-center ">
                            <h3 className="text-danger">{ind+1}</h3>
                        </div>
                        <div className="card-content-description d-flex">
                            <img src= {el.image} alt="" width="100px" />
                            <div className="card-content-description-inner ms-3">
                                <h5>{el.title}</h5>
                                <span>{el.quantity} x PKR {el.price}</span>
                            </div>
                        </div>
                        <div className="card-content-amount text-danger fs-5">
                                PKR {el.quantity * el.price}
                        </div>
                     </div>

                    )}
                    <div className="d-flex fs-4 p-2 justify-content-end">
                        <p className="me-2">Total Amount : </p>
                        <p className="text-end text-danger"> PKR  {bill} </p>
                    </div>
                </div>
            </section>
            <section className="payment-component-inner d-flex">
                <div className="stipe-payment w-50 pe-1 ">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active " id="pills-strip-tab" data-bs-toggle="pill" data-bs-target="#pills-stripe" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Stripe</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-jazz-tab" data-bs-toggle="pill" data-bs-target="#pills-jazz" type="button" role="tab" aria-controls="pills-jazz" aria-selected="false">Jazz Cash</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-stripe" role="tabpanel" aria-labelledby="pills-stipe-tab">
                            <form action="">
                            <div className="row card-field my-2">
                                <div className="col-4">
                                <label htmlFor="" className="fs-5">Card Number</label>
                                </div>
                                <div className="col-8">
                                    <CardNumberElement type="text" className="border-bottom w-75 pb-1 mb-2" id="cardNumber" />
                                </div>
                            </div>
                            <div className="row card-field  my-2">
                                <div className="col-4">
                                <label htmlFor="" className="fs-5">Valid through</label>
                                </div>
                                <div className="col-8">
                                    <CardExpiryElement type="text" className="border-bottom w-75 pb-1 mb-2" id="cardNumber"/>
                                </div>
                            </div>
                            <div className="row card-field  my-2">
                                <div className="col-4">
                                <label htmlFor="" className="fs-5">CVC</label>
                                </div>
                                <div className="col-8">
                                    <CardCvcElement type="text" className="border-bottom w-75 pb-1 mb-2"  id="cardNumber"/>
                                </div>
                            </div>
                            <button type="button" className="btn btn-danger px-4" onClick={(e)=> handleSubmit(e)}>Pay</button>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="pills-jazz" role="tabpanel" aria-labelledby="pills-jazz-tab">Under development ...</div>
                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                    </div>
                </div>
                <div className="cod w-50 ps-1 position-relative border-start">
                    <button className="position-absolute top-50 start-50 translate-middle btn btn-danger fs-4" onClick={()=> handleOrder()}>Cash On Delivery</button>

                </div>
            </section>
        </main>
    )
}
