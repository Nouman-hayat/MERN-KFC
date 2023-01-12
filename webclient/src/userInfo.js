import React , {createContext , useState} from 'react'

export const UserInfoContext = createContext()

export const UserInfoProvider = props =>{
    let [user,setUser] = useState({loggedIn: false})

    return(
        <UserInfoContext.Provider value={[user,setUser]}>
            {props.children}
        </UserInfoContext.Provider>
    )
}



