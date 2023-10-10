import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {

    const { pathname } = useLocation()

    React.useEffect(() => {
        window.scrollTo({
            top : '0px' , 
            left : '0px' ,
            behavior : 'instant'
        })
    } , [pathname] )

    return []

}
