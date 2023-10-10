import React , {useState} from 'react';
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {API_URL} from "../../api"
import './CheckOutLogIn.css'

export default function CheckOutLogIn() {

  const dispatch = useDispatch()
  let [ user , setUser ] = useState({email : "" , password : ""})
  let [ errors , setErrors ] = useState ( {} )

  let handleSubmit = async () => {
    
    if ( user.email.length < 8 || user.password.length < 8 )
    {
      setErrors({email : "Invalid Email address" , password : "Password length must be atleast 8"})
      return 
    }
    else
    {
      await fetch(`${API_URL}/kfc/users/login` , 
      {
        method : "POST" ,
        credentials : 'include' ,
        withCredentials : true ,
        headers : {"Content-type" : "application/json"} ,
        body : JSON.stringify(user)
      }
      )
      .then( data => {
        if( !data.ok ) throw new Error("not found")

        return data.json()
      })
      .then ( data => dispatch({type : "LOGIN_SUCCESS" , payload : data.user}))
      .catch( err => console.log(err))
    }

  }
  console.log(user)

  return (
      <div className='checkOutLogIn-component kfc-card'>
          <div className="kfc-card-header">
              Login with your account
          </div>
          <div className="row">
              <div className="col-6" >
                <input type="email" placeholder='Email' className='w-100 assistant' value={user.email} onChange={e=> setUser({...user , email : e.target.value})}  />
                <span className='error-handler position-relative top-0 start-0'>{errors.email}</span>
              </div>
              <div className="col-6">
                <input type="password" placeholder='Password' className='w-100 assistant' value={user.password} onChange={e=> setUser({...user , password : e.target.value})}  />
                <span className='error-handler position-relative top-0 start-0'>{errors.password}</span>
              </div>
          </div>
          <button className="login" onClick={handleSubmit}>SIGN IN</button>

          <div className='mt-3'>
            <span className='assistant'>Don't have an account ? </span>
            <Link to="/register" className='text-danger assistant'>Sign up here</Link>
          </div>
      </div>
  );
}
