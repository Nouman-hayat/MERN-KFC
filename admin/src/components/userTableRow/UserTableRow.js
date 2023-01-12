import React from 'react'
import './UserTableRow.css'
import copy from  '../../copy.svg'
import {Link} from 'react-router-dom'


export default function UserTableRow(props) {
    let user = props.user
    let copyEmail = ()=>{
        let copied = navigator.clipboard.writeText(user.email)
    }
    return (
        <main className="table-row ">
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p>{user.email} <button className="unset ms-1 p-1" onClick={()=> copyEmail()}> <img src={copy} width="18px" alt="" /></button></p>
            <p>{user.phone}</p>
             <Link to={`/user/profile/${user._id}`}><button className="btn btn-primary">View Profile</button></Link>
        </main>
    )
}
