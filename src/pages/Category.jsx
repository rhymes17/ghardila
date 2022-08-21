import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Listing from '../components/Listing'

const Category = () => {

    const params = useParams()

    const [listings, setListings] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

      const fetchListings = async() =>{
        try {
          const docRef = collection(db, 'listings')

          const q = query(docRef, where("type", "==", params.category_name), orderBy('timestamp', 'desc'), limit(10))

          const res = await getDocs(q)

          const listing = []

          res.forEach((doc) => {
            return listing.push({
              id: doc.id,
              data: doc.data()
            })
          })

          setListings(listing)

          setLoading(false)
        } catch (error) {
          toast.error("Failed to fetch listings")
        }
      }
      fetchListings()
    }, [params.category_name])

  return (
    <div className='w-[80%] mx-auto py-5'>
      <div className=''>
        <h2 className='uppercase text-xl md:text-2xl font-bold'>{params.category_name}</h2>

        {loading ? <h1>Loading...</h1> : (
              listings.length === 0 ? (
                <h1>No listings for {params.category_name}</h1> 
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

export default Category