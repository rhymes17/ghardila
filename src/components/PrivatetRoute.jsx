import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivatetRoute = () => {

    const {loggedIn, loading} = useAuthStatus()

    if(loading){
        return (<h1>Loading....</h1>)
    }

  return (
    loggedIn ? <Outlet /> : <Navigate to='/login'/>
  )
}

export default PrivatetRoute