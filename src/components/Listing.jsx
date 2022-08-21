import React from 'react'
import {FaBed, FaTrash} from 'react-icons/fa'
import { MdBathtub } from 'react-icons/md'
import {BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Listing = ({ listing, myListing,id }) => {

    const navigate = useNavigate()

    const handleDelete = async() => {
        await deleteDoc(doc(db, 'listings', id))
        toast.success("Listing deleted successfully")
        window.location.reload()
    }

  return (
    <div className='bg-gradient-to-br from-gradBg p-5 rounded-xl relative my-6 hover:cursor-pointer' >
        <div className='md:flex gap-4 lg:gap-6 py-6 md:py-0' onClick={() =>  navigate(`/category/${listing.type}/${id}`)}>
            <div className='object-cover w-full md:max-w-[50%] lg:w-[30%]'>
                <img className='rounded-xl w-full max-h-[200px] md:max-h-[200px] object-cover' src={listing.imgs[0]} alt={listing.name}/>
            </div>
            <div className='pt-5 md:pt-0'>
                <h3 className='pb-1 text-xl font-bold lg:text-2xl'>{listing.name}</h3>
                <h3 className='pb-1 font-bold lg:text-xl'>Rs. {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}/month</h3>
                {myListing ? (
                    <div className='flex w-full justify-between'>
                        <div className='flex items-center'>
                            <FaBed className='text-xl lg:text-2xl'/>
                            <p className='px-2 lg:text-base'>{listing.bedrooms} Bedrooms</p>
                        </div>
                        <div className='flex items-center'>
                            <MdBathtub className='text-xl lg:text-2xl'/>
                            <p className='px-2 lg:text-base'>{listing.bathrooms} Bathrooms</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex w-full justify-between'>
                    <div className='flex items-center'>
                        <FaBed className='md:text-xl lg:text-2xl'/>
                        <p className='px-1 md:px-2 text-sm lg:text-base'>{listing.bedrooms} Bedrooms</p>
                    </div>
                    <div className='flex items-center'>
                        <MdBathtub className='md:text-xl lg:text-2xl'/>
                        <p className='px-1 md:px-2 text-sm lg:text-base'>{listing.bathrooms} Bathrooms</p>
                    </div>
                    </div>
                )}
                <p className='text-white/50 lg:text-base'>{listing.address}</p>
            </div>
        </div>

        {myListing && (
            <div className='absolute right-2 top-3 flex gap-3 text-xl lg:text-2xl items-center'>
                <BiPencil onClick={() => navigate(`/edit/${id}`)} className='hover:cursor-pointer'/>
                <FaTrash onClick={handleDelete} className='hover:cursor-pointer'/>
            </div>
        )}
        
    </div>
  )
}

export default Listing