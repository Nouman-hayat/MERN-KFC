import React , {useState,useEffect} from 'react'
import UserTableRow from '../userTableRow/UserTableRow'

export default function UserTable() {

    let serverUrl= "https://kfc-backend.herokuapp.com"
    //GET ALL USERS FROM DB
    let [users, setUsers] = useState([])
    let getUsers = async ()=>{
        await fetch(`${serverUrl}/kfc/users`)
        .then(data=> data.json())
        .then(data=> setUsers(data.users))

    }
    console.log(users)
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className="user-table-component">
            <h2 id="userAccounts">User Accounts</h2>
            <div className="table-inner">
              <div className="table-inner-headings">
                <span>Name</span>
                <span>Email</span>
                <span>Contact No.</span>
              </div>
              {users.length == 0 ?
                <div className='text-center my-5 py-5 fs-3'>No User Accounts</div> : 
                users.map((el,index)=> <UserTableRow key={index} user={el} getUsers={getUsers}/>)}
            </div>
        </div>
    )
}
