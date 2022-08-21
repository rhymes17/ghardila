import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc} from 'firebase/firestore'
import {db, auth} from '../firebase.config'
import {toast} from 'react-toastify'
import {FaBed} from 'react-icons/fa'
import { MdBathtub } from 'react-icons/md'
import Carousel from '../components/Carousel'

const ListingPage = () => {

    // const {isLogged , }
    const [listing, setListing] = useState()
    const [loading, setLoading] = useState(true)
    // const [shareLinkCopied, setShareLinkCopied] = useState(false)
    
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchListing = async() => {
            try {
                const docSnap = await getDoc(doc(db, 'listings', params.id))

                if(docSnap.exists()){
                    setListing(docSnap.data())
                    setLoading(false)
                }
                
            } catch (error) {
                toast.error("Could not get the listing.")
            }
        }

        fetchListing()
        
    }, [navigate, params.id])

    if(loading){
        return ( <h1>Loading...</h1> )
    }

    const createdAt = new Date(listing.timestamp.seconds*1000).toDateString()

  return (
    <main className='pb-6'>
        <div className='w-[90%]  mx-auto border-2 border-transparent rounded-xl py-6 bg-gradient-to-tr from-gradBg'>
            <div className=' w-[90%] mx-auto'>
                
                <h1 className='text-center text-xl lg:text-2xl font-bold'>{listing.name}</h1>

                <Carousel listing={listing} />
                

                {/* <div className='border-2 border-transparent h-[200px] md:h-[500px] my-6'>
                    <img src={listing.imgs[0]} alt={listing.name} className='max-h-[200px] md:max-h-[500px] w-full object-cover rounded-xl'/>
                </div> */}


                <div className='border-2 border-white bg-mainBg rounded-xl  py-3 px-2 my-6 lg:w-[50%] lg:flex lg:flex-col lg:mx-auto'>
                    <h1 className='pb-1'>{listing.name}</h1>

                    <h2 className='font-bold pb-1'>{listing.address}</h2>
                    
                    <h3 className='pb-1 font-bold lg:text-xl'>Rs.   {listing.offer
                        ? listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    /month</h3>
                    
                    <h3 className='pb-1'>Type : <span className='font-bold'>{listing.type === 'house' ? 'Independent House' : 'Flat'}</span></h3>

                    <div className='flex w-full md:w-[50%] lg:w-[80%] justify-between pb-1'>
                        <div className='flex items-center'>
                            <FaBed className='text-xl lg:text-2xl'/>
                            <p className='px-1 md:text-base'>{listing.bedrooms} Bedrooms</p>
                        </div>
                        <div className='flex items-center'>
                            <MdBathtub className='text-xl lg:text-2xl'/>
                            <p className='px-1 lg:text-base'>{listing.bathrooms} Bathrooms</p>
                        </div>
                    </div>

                    <h2 className='pb-1'>Parking : <span className='font-bold'>{listing.parking === true ? 'Yes' : 'No'}</span></h2>

                    <h2 className='pb-1'>Furnished : <span className='font-bold'>{
                        listing.furnished === true ? 'Yes' : 'No'
                    }</span></h2>

                    <p className='text-white/30 pb-1'>Listed On : {createdAt}</p>

                    {(auth.currentUser == null || auth.currentUser.uid !== listing.userRef) && (
                        <Link to={`/contact/${listing.userRef}`}>
                            <button className='flex mx-auto my-5 px-2 py-1 rounded md:px-3 md:py-2 border-2 bg-white
                            border-white hover:border-white hover:bg-mainBg hover:text-white text-mainBg ani'>
                                See Owner's Details
                            </button>
                        </Link>
                        
                    )}
                </div>
            </div>
        </div>
    </main>
  )
}

export default ListingPage