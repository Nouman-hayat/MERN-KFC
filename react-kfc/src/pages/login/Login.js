import React , {useState} from 'react'
import './Login.css' 
import {Link} from 'react-router-dom'
import UserProfile from '../../components/userProfile/UserProfile'
import { UserInfoContext } from '../../userInfo'
import {useSelector , useDispatch} from 'react-redux'
import { API_URL } from "../../api";


function Login() {

    const dispatch = useDispatch()
    let [formInfo,setFormInfo] = useState({email: "" , password: ""})

    let user = useSelector (state => state.userReducer)


    let handleLogin = ()=>{

        fetch(`${API_URL}/kfc/users/login` ,
         {
            method: "POST" 
            ,credentials: 'include'
            ,withCredentials: true
            ,headers:{"Content-type": "application/json"},
            body: JSON.stringify(formInfo)})
          .then(res=> {
            if(!res.ok) throw new Error("not found")

            return res.json()
          } )
          .then(data=> {

            dispatch({ type:"LOGIN_SUCCESS" ,  payload : data.user })
            localStorage.setItem("userCredentials" , JSON.stringify( data.user ) )
            setFormInfo({email: "" , password: ""})
          } ).catch(err=> alert(err))
    }

    let isLoggedIn = ()=>{
        if(user.isLoggedIn === true)
            return true

        return false
    }
    
    
    return (
        
        <div className="login-parent">
            {isLoggedIn() ? <UserProfile user={user.user}></UserProfile> : 
            <div className="container">
            <div className="login-inner">
                <div className="login-inner-col">
                    <h1 className="login-inner-col-heading mb-0">Login with social links</h1>
                    <div className="social-links">
                        <button className="gmail"><span>Login with gmail</span></button>
                        <button className="fb">Login with facebook</button>
                    </div>
                    <h1 className="login-inner-col-heading">Login with your account</h1>
                    <p className="assistant mb-4">Enter your e-mail address and password to log in.</p>
                    <div className="login-form">
                        <form action="" className="login-form-inner">
                            <div className="form-item" id="form-item" >
                     
                                <input  type="email" placeholder="Email" value={formInfo.email} onChange={(e)=> setFormInfo({...formInfo , email:e.target.value})}  />
                            </div>
                            <div className="form-item"  id="form-item2"  >
                                <input placeholder="Password" type="Password" value={formInfo.password} onChange={(e)=> setFormInfo({...formInfo , password:e.target.value})} />
                            </div>
                            <button className="forgot-password"><Link to="/forgotpassword">Forgot password?</Link></button>
                            <button type="button" className="sign-in" onClick={()=> handleLogin()}>sign in</button>
                        </form>
                    </div>
                </div>
                <div className="login-inner-col">
                <h1 className="login-inner-col-heading">New customer</h1>
                <p className="assistant">By creating an account with us, purchasing on our <br /> website becomes much faster and easier.</p>
                <Link className="create-account" to="/register">create account</Link>
                
                </div>
            </div>
            </div>
            }
        </div>
    )
}

export default Login