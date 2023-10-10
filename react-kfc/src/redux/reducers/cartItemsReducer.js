let initialState = { cartItems: [] }
export let cartItemsReducer = (state = initialState , action)=>{
    switch(action.type)
    {
        case 'ADD_TO_CART':
            
            let {quantity , title} = action.payload
            let isSameProduct = products =>{ //RETURNS TRUE IF PRODUCT ALREADY EXISTS IN CART
                return products.some(element => element.title === title)
            }

            if(isSameProduct(state.cartItems)) //IF PRODUCT ALREADY EXISTS
            {
                console.log("IS SAME PRODUCT")
                return {...state , cartItems: state.cartItems.map( element =>{
                    if(element.title === title)
                    {
                        element.price = (element.price/element.quantity)*(quantity+element.quantity) // multiply unit price by total quantity (a simpler solution exists but idc)
                        element.quantity = element.quantity + quantity //update quantity
                    }
                    return element
                })}
            }

            else // IF NEW PRODUCT IS ADDED
            return {...state , cartItems : [...state.cartItems , action.payload] }
        
        case 'DECREMENT_FROM_CART':
            return {
                ...state ,
                cartItems : state.cartItems.map(element=>{
                    if(element.title === action.payload )
                    {
                        console.log("DECREMENTING")
                        element.price = (element.price/element.quantity)*(element.quantity - 1) // multiply unit price by total quantity (a simpler solution exists but idc)
                        element.quantity -=  1 //update quantity
                    }
                    return element
                })
            }
        
        case 'REMOVE_FROM_CART':
                return{
                    ...state ,
                    cartItems : state.cartItems.filter(element=> element.title !== action.payload)
                }
        case 'EMPTY_CART':
            return { cartItems: [] }
        
        default :
            return state
    }
}

