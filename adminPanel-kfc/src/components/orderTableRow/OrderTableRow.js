import React from 'react'
import './orderTableRow.css'
import {Link} from 'react-router-dom'


export default function OrderTableRow(props) {
    let {location , items,bill , _id} = props.order

    let completeOrder = async ()=>{
        await fetch(`https://kfc-backend.herokuapp.com/kfc/order/cancel/${_id}` 
        , {method: 'DELETE' , credentials : 'include'})
        .then(res=> res.json()).then(data=> console.log(data))
        props.getOrders()
    }

    return (
        <div className="table-row">
            <p className="d-block d-sm-none">Location :</p>
           <p>{`${location.city} , ${location.area}`}</p>
           <p className="d-block d-sm-none">Items :</p>
           <ul>
            {items.map((el,ind)=> <li className="fs-6" key={ind}>{el.title } x { el.quantity}</li>)}
           </ul>
           <p className="d-block d-sm-none">Bill :</p>
            <p className="fw-bold">PKR. {bill}</p>
            <button className="bg-danger text-white border-0 rounded fw-bold">Cancel</button>
            <button className="bg-success text-white border-0 rounded fw-bold" onClick={()=> completeOrder()}>Dispatch</button>
        </div>
    )
}
