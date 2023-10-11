import React , {useState , useEffect} from 'react'
import OrderTableRow from '../orderTableRow/OrderTableRow'

export default function OrderTable() {

    let serverUrl= "https://kfc-backend.herokuapp.com"
  
    //GET ALL ACTIVE ORDERS FROM DB
    let [orders , setOrders]  = useState([])
    let getOrders = async ()=>{
      await fetch(`${serverUrl}/kfc/order/getAll`)
      .then(data=> data.json())
      .then(data=> setOrders(data.orders))
    }
    
    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="order-table-component">
            <h2 id="orders">Active Orders</h2>
            <section className="table-inner order-table-inner">
              <div className="table-inner-headings d-none d-sm-grid ">
                <span>Order Location</span>
                <span>Order Details</span>
                <span>Total Bill</span>
              </div>
              {orders.map((el,index)=> <OrderTableRow key={index} order={el} getOrders={getOrders}/>)}
            </section>
        </div>
    )
}
