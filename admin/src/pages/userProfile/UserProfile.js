import './UserProfile.css'
import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ActiveOrderItem from '../../components/activeOrderItem/ActiveOrderItem'

export default function UserProfile() {
    let [user,setUser] = useState({})
    let [activeOrders , setActiveOrders] = useState(false)
    let {slug} = useParams() // GET USER ID FROM URL

    let getUser = async ()=>{

        await fetch(`https://kfc-backend.herokuapp.com/kfc/users/userID/${slug}`).then(resp=> resp.json()).then(data=> setUser(data.user) , getActiveOrders())
    }

    let getActiveOrders = async ()=>{
        await fetch(`https://kfc-backend.herokuapp.com/kfc/order/user/activeOrders/${slug}`)
        .then(res=> res.json()) 
        .then(data=> setActiveOrders(data.orders))
    }

    console.log(user)
    console.log(activeOrders)
    useEffect(()=>{
        getUser()
    },[])

    

    return (
        <main className="user-profile-parent">
            <section className="hero-section">
                <h6>{`${user.firstName} ${user.lastName}`}</h6>
            </section>
            <main className="user-details">
                <div className="order-details">
                    <h4>Order Details</h4>

                    <h5>Active Orders :</h5>
                    <div className="order-details-inner">
                    {activeOrders? activeOrders.map((el,i)=>{
                        return <ActiveOrderItem key={i} order={el} number={i}></ActiveOrderItem>
                    }): <div>No active orders</div>}
                    </div>
                </div>
                <div className="personal-details">
                    <h6>Personal Details</h6>
                    <p>Email : {user.email}</p>
                    <p>Country : {user.country}</p>
                    <p>Province : {user.province}</p>
                    <p>City : {user.city}</p>
                </div>
            </main>
        </main>
    )
}
