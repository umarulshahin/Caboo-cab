
import React from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
const AdminPrivatRoute = ({children}) => {
    
    const admin=Cookies.get('adminTokens')
        return admin ? < Navigate to="/userhome" /> : children ;

    

}

export default AdminPrivatRoute;