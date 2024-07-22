
import React from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
const PrivatRoute = ({children}) => {
    
    const user=Cookies.get('userTokens')
    const admin=Cookies.get('adminTokens')
        return user ? < Navigate to="/userhome" /> : children ;

    

}

export default PrivatRoute