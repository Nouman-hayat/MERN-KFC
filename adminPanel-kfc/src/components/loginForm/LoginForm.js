import React ,{useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {store} from '../../redux/store'
export default function LoginForm(props) {

    let dispatch = useDispatch()
    let isLoggedIn = useSelector(state=> state.adminReducer.isLoggedIn)
    let [isRegistered , setIsRegistered] = props.isRegistered

    let showRegisterForm = ()=>{
        setIsRegistered(!isRegistered)
    }

    let handleLogin = async ()=>{
        await fetch("https://kfc-backend.herokuapp.com/kfc/admin/login" ,
        {   method:'POST' ,
            headers:{'Content-type':'application/json'} ,
            credentials: 'include',
            withCredentials: true ,
            body: JSON.stringify(admin)
        })
        .then(res=> {
            if(!res.ok) throw new Error("Email or password is incorrect") 

            return res.json()
        })
        .then( (data)=> {
            dispatch({type:"LOGIN-ADMIN" , payload:data })
            let storedAdmin = store.getState().adminReducer
            localStorage.setItem("admin",JSON.stringify(storedAdmin))
        })
        .catch(error=> alert(error))
    }
    let [admin,setAdmin] = useState({email:"wahabmaliq@gmail.com" , password:"password123"})

    return (
        <div className="login-from-component">
                <div className="form">
                    <h2> Login</h2>
                    <div className="form-inner">
                        <input type="text" className="w-100" placeholder="Email" value={admin.email} onChange={(e)=>setAdmin({...admin , email:e.target.value})}/>
                        <input type="text" className="w-100" placeholder="Password"  value={admin.password} onChange={(e)=>setAdmin({...admin , password:e.target.value})} />
                        
                    </div>
                    <button className="btn btn-primary mx-auto my-4 d-block" onClick={()=> handleLogin()} >SUBMIT</button>
                    <span className="p-2" onClick={()=> showRegisterForm()}>Not registered ? Click here</span>
                </div>
        </div>
    )
}
