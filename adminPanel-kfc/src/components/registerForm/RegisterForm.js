import React, {useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
export default function RegisterForm(props) {

    let isLoggedIn = useSelector(state=> state.adminReducer.isLoggedIn)

    //REDUX GETTING STATE
    let admin = useSelector(state=>state.adminReducer)
    const dispatch = useDispatch()
    //REDUX
    
    let [isRegistered , setIsRegistered] = props.isRegistered

    let hideRegisterForm = ()=>{
        setIsRegistered(!isRegistered)
    }
    
    let handleRegister = async ()=>{
        await fetch("https://kfc-backend.herokuapp.com/kfc/admin/register" ,
        {method:'POST' ,
        headers:{'Content-type' : 'application/json'}
        ,credentials: 'include'
        ,withCredentials: true 
        , body : JSON.stringify(user) })
        .then(resp=> {
            if(!resp.ok)
            {
                throw new Error("Admin Validation failed")
            }
            return resp.json()
        })
        .then(data=> {
            dispatch({type:'LOGIN-ADMIN',payload:data.admin})
        }).catch(err=> alert(err))
    }
    let [user,setUser] = useState({})

    console.log(user)
    return (
        <div className="register-form-component">
                <div className="form">
                    <h2>Register</h2>
                    <div className="form-inner">
                        <input type="text" className="w-100" placeholder="Email" onChange={(e)=> setUser({...user, email: e.target.value})} />
                        <input type="text" className="w-100" placeholder="Password" onChange={(e)=> setUser({...user, password: e.target.value})}  />
                        <input type="text" className="w-100" placeholder="Admin Secret keyword" onChange={(e)=> setUser({...user, secret: e.target.value})} />
                    </div>
                    <button className="btn btn-primary mx-auto my-4 d-block" onClick={()=> handleRegister()} >SUBMIT</button>
                    <span className="p-2" onClick={()=> hideRegisterForm()}>Back to Login</span>
                </div>
        </div>
    )
}
