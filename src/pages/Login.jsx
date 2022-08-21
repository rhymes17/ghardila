import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase.config'
import {toast} from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password : '',
    })

    const {email, password} = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
              const userCrendential = await signInWithEmailAndPassword(auth, email, password)

              if(userCrendential.user)
              navigate('/')
            
        } catch (error) {
            toast.error('Check your crendentials, Either password or email is incorrect.')
        }
    }

  return (
    <div>
            <div className=' w-[320px] h-[500px] rounded-2xl absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] px-4 py-5 bg-gradient-to-br from-gradBg '>

                    <div className='max-w-[250px] mx-auto py-14'>
                        <h1 className='text-2xl font-bold '>Log In</h1>
                    
                    <form className='mt-10 text-white' onSubmit={handleSubmit}>
                        <input
                        value={email}
                        onChange={handleChange}
                        id='email'
                        type='email'
                        className='w-full mb-3 px-4 py-2 bg-slate-400 font-bold 
                        placeholder:font-normal
                        placeholder:text-white/80 rounded-md'
                        placeholder='Email' />
                        <input
                        value={password}
                        onChange={handleChange}
                        id='password'
                        type='password'
                        className='w-full mb-3 px-4 py-2 bg-slate-400 font-bold
                        placeholder:font-normal
                        placeholder:text-white/80 rounded-md'
                        placeholder='Password' />
                    </form>

                    <button className='bg-mainBg my-5 px-3 py-2 rounded border-2 border-white flex mx-auto hover:border-transparent hover:bg-white hover:text-mainBg ani' type='submit' onClick={handleSubmit}>Login</button>

                    <div className=''>
                        <p className='text-sm text-white/50 '>Don't have an account yet??&nbsp;
                        <Link to='/signup'>
                        <span className='text-base text-white'>
                            Sign Up
                        </span>
                        </Link>
                        </p>
                    </div>
                    </div>
            </div>
    </div>
  )
}

export default Login