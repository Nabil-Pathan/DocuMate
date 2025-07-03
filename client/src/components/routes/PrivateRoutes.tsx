import React from 'react'
import { Navigate, RouteProps } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

interface PrivateRoutesProps {
    children : React.ReactNode
}

function PrivateRoutes ({children} : PrivateRoutesProps & RouteProps)  {
    const { user } = useUserContext()
    return user !== null ? (children as React.ReactElement) : <Navigate to="/login"/>
}

export default PrivateRoutes