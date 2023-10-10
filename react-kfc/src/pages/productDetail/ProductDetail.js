import React , {useState , useEffect,useContext} from 'react'
import {useParams} from 'react-router-dom'
import { useAlert } from 'react-alert'
import {useSelector , useDispatch} from 'react-redux'
import {store} from '../../redux/store'
import { API_URL } from "../../api";
import './ProductDetail.css'


export default function ProductDetail() {

    let [quantity, setQuantity] = useState(1)
    let {slug} = useParams()
    let [product, setProduct] = useState({})
    let alert = useAlert()

    let getProduct = ()=>{
        fetch(`${API_URL}/kfc/products/productID/${slug}`)
        .then((resp)=>resp.json())
        .then((data)=>setProduct(data.product))
    }
    
    //INCREMENT PRODUCT QUANTITY
    let increment = ()=>{
        setQuantity(++quantity)
    }
    //DECREMENT PRODUCT QUANTITY
    let decrement = ()=>{
        if(quantity===1) return
        setQuantity(--quantity)
    }

    let orderItems = useSelector(state=> state.orderItemsReducer)
    const dispatch = useDispatch()
    let handleSubmit = ()=>{
        dispatch({type: 'ADD_TO_CART' , payload: {...product,quantity , price : product.price*quantity}})
        alert.success('Added to cart')
        let cartItems = store.getState().cartItemsReducer.cartItems
        localStorage.setItem("cartItems" , JSON.stringify(cartItems))
    }

    useEffect(()=>{
        getProduct()
    },[])
    
    return (
        <div className="product-detail-parent">
            <div className="container">
                <section className="product-detail-inner">
                    <div className="product-img">
                        <img src={product.image} width="100%" alt=""  />
                    </div>
                    <div className="product-detail-caption">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                    <div className="add-product-parent">
                        <h3>PKR {product.price*quantity}</h3>
                        <div className="counter">
                            <button onClick={()=> decrement()}>-</button>
                            <button>{quantity}</button>
                            <button onClick={()=> increment()}>+</button>
                        </div>
                        <button className="add-bucket-btn" onClick={()=> handleSubmit()}>Add to bucket</button>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
