import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

const Contact = () => {

    const params = useParams()
    const [owner, setOwner] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOwner = async() => {
            try {
                const docSnap = await getDoc(doc(db, 'users', params.id))

                setOwner(docSnap.data())
                setLoading(false)
            } catch (error) {
                toast.error("Could not fetch Owner's details")
            }
        }
        fetchOwner()
    }, [params.id])

    if(loading){
        return (<h1>Loading...</h1>)
    }

    const date = new Date(owner.timestamp.seconds*1000).toDateString()
    console.log(date)

  return (
    <div className='w-[90%] mx-auto'>
        <h1 className='text-2xl font-bold my-6'>Contact</h1>
        <div className='w-[80%] mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:w-[70%] mx-auto'>
            <div className='bg-white border-2 border-transparent text-black px-5 py-3 rounded-xl'>
            <p>username: <span className='font-bold'>{owner.username}</span></p>
            <p>email: <span className='font-bold'>{owner.email}</span></p>
          </div>
          <div className='bg-white border-2 border-transparent text-black px-5 py-3 items-center flex rounded-xl'>
            <p>Joined On: <span className='font-bold'>{date}</span></p>
            </div>
            </div>
        </div>          
        
    </div>
  )
}

export default Contact