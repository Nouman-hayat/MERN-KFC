import React from 'react'
import {useDispatch} from 'react-redux'
import {store} from '../../redux/store'
import { useAlert } from 'react-alert'
export default function SideBarListItem(props) {

    let product = props.product
    const dispatch = useDispatch()
    let alert = useAlert()

    let updateLocalStorage = ()=>{
        let cartItems = store.getState().cartItemsReducer.cartItems
        localStorage.setItem("cartItems" , JSON.stringify(cartItems))
    }

    let incrementItem = ()=>{
        dispatch({type: 'ADD_TO_CART' , payload : {...product , quantity: 1} })

        updateLocalStorage()
    }

    let decrementItem = ()=>{
        if(product.quantity == 1)
        return

        dispatch({type:'DECREMENT_FROM_CART' , payload : product.title} )

        updateLocalStorage()
    }

    let removeItem = ()=>{
        dispatch({type:'REMOVE_FROM_CART' , payload: product.title})
        alert.error('Removed from cart')
        updateLocalStorage()
    }
    return (
        <div className="list-item mt-3">
             <div className="order-list-item">
                <div><span>{product.title}</span> <span>PKR {product.price}</span></div>
                <p>{product.quantity } x PKR { product.price/product.quantity}</p>
                <div className="list-item-actions">
                    <button className="btn btn-danger "  onClick={()=> decrementItem()}>-</button>
                    <button className="btn btn-danger" onClick={()=> incrementItem()}>+</button>
                    <button className="btn-danger btn" onClick={()=> removeItem()}><i className="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    )
}
