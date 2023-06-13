import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({ component: Component, fallbackPath, isAllowed }) => {
    if (!isAllowed) {
        return <Navigate to={fallbackPath} />
    }
    return (
        <Component />
    )
}

export default ProtectedRoutes