import React from 'react'
import './ActiveOrderItem.css'
export default function ActiveOrderItem(props) {
    let order = props.order
    return (
        
        <div className="active-order-item my-5">
            <h5 className="text-primary">{props.number + 1} .</h5>
            <div className="active-order-item-details ps-5">
                <p className="fw-bold ">Status : {order.status}</p>
                <p className="fw-bold">Items:</p>
                <ul>
                {order.items.map((el,ind)=> <li className="fw-bold text-primary" key={ind}>{el.title} x {el.quantity}</li>)}
                </ul>
                <span className="fw-bold">Total Bill : </span> <span className="text-danger fw-bold">PKR {order.bill}</span>
            </div>
        </div>
    )
}
