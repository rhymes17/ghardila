import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase.config'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import {MdAddCircleOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Listing from '../components/Listing';

const Profile = () => {

  const navigate = useNavigate()

  //eslint-disable-next-line
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fetchListing = async() => {
        try {
          const docRef = collection(db, 'listings')

          const q = query(docRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))

          const res = await getDocs(q)
          const listing = []

          res.forEach((doc) => {
            return listing.push({
              id: doc.id,
              data : doc.data()
            })
          })

        setListings(listing)
        } catch (error) {
          console.log(error)
        }
        
        setLoading(false)
      }
      fetchListing()
  }, [])

  const test = new Date(auth.currentUser.metadata.creationTime).toDateString()

  const {name, email} = formData

  return (
    <div>
      <div className='w-[90%] mx-auto py-12'>
        <h1 className='text-3xl font-bold my-6'>My Profile</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:w-[70%] mx-auto'>
          <div className='bg-white border-2 border-transparent text-black px-5 py-3 rounded-xl'>
            <p>username: <span className='font-bold'>{name}</span></p>
            <p>email: <span className='font-bold'>{email}</span></p>
          </div>
          <div className='bg-white border-2 border-transparent text-black px-5 py-3 items-center flex rounded-xl'>
            <p>Joined On: <span className='font-bold'>{test}</span></p>
          </div>
        </div>

        <div className='my-6 w-[70%] flex mx-auto border-2 border-transparent py-2 bg-white rounded-xl text-black hover:cursor-pointer hover:bg-mainBg hover:border-white hover:text-white ani' onClick={() => navigate('/create-listing')}>
          <div className='flex mx-auto items-center'>
            <h1 className='px-2'>Post a new Listing</h1>
            <MdAddCircleOutline className='text-3xl ' />
          </div>
          
        </div>

      {loading ? <h1>Loading...</h1> : (
              listings.length === 0 ? (
                <h1>No listings</h1> 
              ) : (
                <div className='border-2 border-transparent'>
                <h2 className='text-2xl'>My Listings</h2>
                <div className='my-6'>
                  {listings.map((listing) => (
                    <Listing listing={listing.data} myListing={true} key={listing.id} id={listing.id}/>
                    ))}
                  </div>
                </div>
              )
              
      )}
        
      </div>
    </div>
  )
}

export default Profile