import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase.config'
import { useAuthStatus } from '../hooks/useAuthStatus'

const Navbar = () => {
  const navigate = useNavigate()

  const {loggedIn, loading} = useAuthStatus()

  const handleLogOut = () => {
    auth.signOut()
    navigate('/login')
    window.location.reload()
  }

  if(loading){
    return (<h1>Loading....</h1>)
  }
  return (
    <nav className='max-w-[95%] mx-auto px-6 pt-5 flex justify-between items-center mb-5'>
      <Link to='/'>
        <h1 className='text-xl md:text-2xl font-bold'>{'<GharDila />'}</h1>
      </Link>

        {loggedIn ? (
          <button className='border-2 border-white px-2 py-1 rounded md:px-3 md:py-2 hover:border-transparent hover:bg-white hover:text-mainBg  text-white ani' onClick={handleLogOut}>Logout</button>
        ) : (
          <div className='flex gap-2 md:gap-4'>
          <Link to='/signup'>
            <button className=' hidden md:block border-2 border-transparent px-2 py-1 rounded md:px-3 md:py-2 hover:border-white bg-white text-mainBg hover:bg-transparent hover:text-white ani' >Sign Up</button>
          </Link>
            
          <Link to='login'>
            <button className='border-2 border-white px-2 py-1 rounded md:px-3 md:py-2 hover:border-transparent hover:bg-white hover:text-mainBg text-white ani'>Sign In</button>
          </Link>
            
        </div>
        )}
        
    </nav>
  )
}

export default Navbar