import './SideBar.css'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import SideBarListItem from '../sideBarListItem/SideBarListItem'
import { useAlert } from 'react-alert'
import {store} from '../../redux/store'
export default function SideBar(props) {
    
    
    const alert = useAlert()
    const dispatch = useDispatch()
    
    let [location ,setLocation] = useState({ city: "" , area: ""})
    let [errors , setErrors] = useState([])

    let cartItems  = useSelector(state=> state.cartItemsReducer.cartItems)
    let [bill,setBill] = useState(cartItems.reduce((accum,current) => accum + (current.price) , 0)) 

    React.useEffect(()=>{
        setBill(cartItems.reduce((accum,current) => accum + (current.price) , 0))
    }, [cartItems])
    
    
    let handleOrder = async ()=>{

        if(cartItems.length == 0 || bill < 250)
        {
            alert.error("Add more items to cart . Total bill must be atleast PKR 250")
            return
        }

        if( location.city == "" || location.area == "")
        {
            alert.error("City and Area are required")
            return
        }

        dispatch( {type : "SAVE_LOCATION" , payload : location})
        props.setSideBar(false)
         }


    return (

        <main className="side-bar-parent" >
            <div className="side-bar-overlay" onClick={()=> props.setSideBar(false)}>

            </div>
            <div className="side-bar-content">
                <div className="side-bar-content-header">
                    <span>YOUR BUCKET</span>
                    <span>PKR {bill}</span>
                </div>
                {cartItems.length == 0 ? <div className='side-bar-skeleton'>Hungry? Add something to your bucket</div> : 

                    <div className="side-bar-content-inner">
                        <div className="address">
                            <h5>Select delivery area</h5>
                            <input className="assistant" type="text" list="city" name="cities" id="cities" placeholder="City" spellCheck="false" onChange={(e)=> setLocation({...location , city:e.target.value })} />
                            <datalist id="city">
                                <option value="rawalpindi">Rawalpindi</option>
                                <option value="islamabad">Islamabad</option>
                            </datalist>
        
                            <input type="text" className="assistant mt-4" list="area" name="areas" id="areas" placeholder="Search Area" spellCheck="false" onChange={(e)=> setLocation({...location , area:e.target.value })}/>
                            <datalist id="area">
                                <option value="saddar">Saddar</option>
                                <option value="kashmir rd">Kashmir RD</option>
                            </datalist>
                        </div>
                        <div className="order-list">
                            <h5 className="text-center">Order Details</h5>
                            {cartItems.map((el,ind)=>  <SideBarListItem product = {el} key={ind} /> )}
                            <div className="mt-4 d-flex justify-content-between">
                            <span className="fs-4">Your total : </span> <span className="fs-4 text-danger">PKR {bill}</span>
                            </div>
                        </div>
                        { (location.city && location.area) ? 
                        
                        <Link to="/viewCart" className="order-btn w-75" onClick={()=> { handleOrder()}} >Proceed to Checkout</Link>
                        :
                        <button className="order-btn order-btn-inactive w-75">Proceed to Checkout</button>  
                        
                        }
                        
                        {errors.map((el,ind)=> <p className="text-center mt-4" key={ind}>{el.message}</p>)}

                    </div>

                }
            </div>
        </main>
    )
}