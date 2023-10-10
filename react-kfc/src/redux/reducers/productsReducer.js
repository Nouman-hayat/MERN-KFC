let initialState = []


export let productsReducer = ( state = initialState , action)=>{
    
    switch(action.type)
    {

        case 'SAVE-PRODUCTS':
            return  state = action.payload
            

        default:
            return state
    }

}