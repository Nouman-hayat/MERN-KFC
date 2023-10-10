import React from 'react'
import './ActiveOrderItem.css'
export default function ActiveOrderItem(props) {
    let order = props.order
    return (
        
        <div className="active-order-items  assistant kfc-card">
            <h5>{props.number + 1} .</h5>
            <div className="active-order-item-details ps-5">
                <p className="  ">Status : {order.status}</p>
                <p className="">Items:</p>
                <ul>
                {order.items.map((el,ind)=> <li className=" text-primary" key={ind}>{el.title} x {el.quantity}</li>)}
                </ul>
                <span className="">Total Bill : </span> <span className="text-danger">PKR {order.bill}</span>
            </div>
        </div>
    )
}
