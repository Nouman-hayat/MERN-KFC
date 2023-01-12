import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function ProtectRoute( props ) {

    let Component = props.component
    const history = useHistory()
    let isLoggedIn = useSelector( state => state.userReducer.isLoggedIn)


    useEffect( ()=> {

        if( !isLoggedIn )
        history.push("/login")

    } , [isLoggedIn] )



  return <div> <Component/> </div>;
}
