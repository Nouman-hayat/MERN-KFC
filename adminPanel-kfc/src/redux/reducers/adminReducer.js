let initialState = {isLoggedIn : false , admin:{_id:"",email:"",password:"" , __v:"0"}}

export const adminReducer = (state=initialState , action)=>{
    switch(action.type)
    {
        case 'LOGIN-ADMIN':
            return {...state , isLoggedIn:true, admin: {...action.payload} }
        
        case 'LOGOUT-ADMIN':
            return {isLoggedIn : false , admin:{_id:"",email:"",password:"" , __v:"0"}}
        
        default:
            return state
    }
}