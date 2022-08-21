import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '../firebase.config'
import {toast} from 'react-toastify'

const SignUp = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username : '',
        email: '',
        password : '',
    })

    const {username, email, password} = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

                const userCrendential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCrendential.user

                updateProfile(auth.currentUser , {
                    displayName: username
                })

                await setDoc(doc(db, 'users', user.uid), formDataCopy)
                navigate('/')
            
        } catch (error) {
            toast.error('Email is already in use')
        }
    }

  return (
    <div>
            <div className=' w-[320px] h-[500px] rounded-2xl absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] px-4 py-5 bg-gradient-to-br from-gradBg '>

                    <div className='max-w-[250px] mx-auto py-14'>
                        <h1 className='text-2xl font-bold '>Sign Up</h1>
                    
                    <form className='mt-10 text-white' onSubmit={handleSubmit}>
                        <input
                        value={username}
                        id='username'
                        onChange={handleChange}
                        className='w-full mb-3 px-4 py-2 bg-slate-400 font-bold
                        placeholder:font-normal
                        placeholder:text-white/80 rounded-md'
                        placeholder='Username' />
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

                    <button className='bg-mainBg my-5 px-3 py-2 rounded border-2 border-white flex mx-auto hover:border-transparent hover:bg-white hover:text-mainBg ani' type='submit' onClick={handleSubmit}>Sign Up</button>

                    <div className=''>
                        <p className='text-sm text-white/50 '>Already have an account?&nbsp;
                        <Link to='/login'>
                        <span className='text-base text-white'>
                            Log In
                        </span>
                        </Link>
                        </p>
                    </div>
                    </div>
            </div>
    </div>
  )
}

export default SignUp