import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

export default function Header() {

    let dispatch = useDispatch()
    let handleLogout = async ()=>{
        await fetch("https://kfc-backend.herokuapp.com/kfc/admin/logout" ,
        {method:'POST' ,
        headers:{'Content-type':'application/json'} ,
        credentials: 'include',
        withCredentials: true ,
        body: JSON.stringify({"logout":true})})
        .then(res=> res.json())
        .then(data=> dispatch({type:'LOGOUT-ADMIN'}))
        localStorage.removeItem('admin')
    }
    

    return (
        <div className="header-parent">
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">KFC</Link>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100 d-none d-md-block" type="text" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-danger align-self-stretch " onClick={()=> handleLogout()}>Logout</button>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <Link to="/createProduct" className="nav-link" href="#">Create Product</Link>
                    </li>
                </ul>
            </header>
        </div>
    )
}
