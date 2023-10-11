import React from 'react'
import './Login.css'
import LoginForm from '../../components/loginForm/LoginForm'
import RegisterForm from '../../components/registerForm/RegisterForm'
export default function Login(props) {

    let [isRegistered , setIsRegistered] = React.useState(true)
    
    return (
        <div className="login-component">
                <div className="login-component-inner">
                    <div className="side-info">
                        <h1>Welcome to KFC Admin Panel</h1>
                        <p>Here you can perform CRUD operations on all products as well as placed orders</p>
                    </div>
                    {isRegistered? <LoginForm isRegistered={[isRegistered , setIsRegistered]}  /> :<RegisterForm  isRegistered={[isRegistered , setIsRegistered]} /> }

            </div>
        </div>
    )
}
