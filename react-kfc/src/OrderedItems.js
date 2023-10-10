import React , {createContext , useState} from 'react'

export const orderListContext = createContext()

export const OrderListProvider = props =>{
    const [orderItems,setOrderItems] = useState([])
    return(
        <orderListContext.Provider value={[orderItems,setOrderItems]}>
            {props.children}
        </orderListContext.Provider>
    )
}

