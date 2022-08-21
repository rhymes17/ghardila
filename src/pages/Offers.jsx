import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Listing from '../components/Listing'
import { db } from '../firebase.config'

const Offers = () => {

  const [listings, setListings] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async() => {
      try {
        const docRef = collection(db, 'listings')

        const q = query(docRef, where('offer' ,'==', true), orderBy('timestamp', 'desc'), limit(10))

        const res = await getDocs(q)

        const listing = []
        res.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listing)
        
      } catch (error) {
        toast.error("Unable to fetch Offers.")
        console.log(error)
      }

      setLoading(false)
    }
    fetchListing()
  }, [])

  return (
    <div>
      <div className='w-[90%] mx-auto py-5'>
        <h2 className='text-2xl font-bold'>Offers</h2>

        {loading ? <h1>Loading...</h1> : (
              listings.length === 0 ? (
                <h1>No listings for Offers</h1> 
              ) : (
                <div className='border-2 border-transparent'>
                <div className='my-6'>
                  {listings.map((listing) => (
                    <Listing listing={listing.data} myListing={false} key={listing.id} id={listing.id}/>
                    ))}
                  </div>
                </div>
              )
              
      )}
      </div>
    </div>
  )
}

export default Offers