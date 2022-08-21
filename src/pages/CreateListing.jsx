import { useState, useEffect, useRef } from 'react'
import {onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { auth, db } from '../firebase.config'

const CreateListing = () => {

  const [formData, setFormData] = useState({
    name :'',
    offer: false,
    parking: true,
    regularPrice : 0,
    discountedPrice : 0,
    type: "flat",
    userRef : "",
    address : "",
    bathrooms : 0,
    bedrooms : 0,
    furnished : false,
    imgUrls: [],

  })
  const [loading, setLoading] = useState(false)

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    imgUrls,
  } = formData
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if(isMounted){
      onAuthStateChanged((auth) , (user) => {
        if(user){
          setFormData({...formData, userRef: user.uid})
        }else{
          navigate('/login')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = async(e) => {
    e.preventDefault()

    setLoading(true)

    if(discountedPrice >= regularPrice){
      setLoading(false)
      toast.error('Discounted price needs to be less than regular price')
      return
    }

    if(imgUrls.length > 6){
      setLoading(false)
      toast.error('Max 6 Images allowed')
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }
  
    const imgs = await Promise.all(
      [...imgUrls].map((image) => storeImage(image))
    ).catch((err) => {
      
      setLoading(false)
      toast.error('Images not uploaded maybe unsupported file type.')
      console.log(err)
      return
    })
  
    const formDataCopy = {
      ...formData,
      imgs,
      timestamp : serverTimestamp()
    }
    delete formDataCopy.imgUrls
    !formDataCopy.offer && delete formDataCopy.discountedPrice

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('Listing saved')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  

  const onMutate = (e) => {
    let boolean = null

    if(e.target.value === 'true'){
      boolean = true
    }

    if(e.target.value === 'false'){
      boolean = false
    }

    if(e.target.files){
      setFormData((prevState) => ({
        ...prevState,
        imgUrls: e.target.files,
      }))
    }

    if(!e.target.files){
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id] : boolean ?? e.target.value
      }))
    }
    
  }

  if(loading){
    return (<h1>Loading...</h1>)
  }

  return (
    <div className='py-6 max-w-[90%] md:w-[80%] lg:w-[60%] mx-auto '>
        <div className='  border-2 border-transparent rounded-2xl bg-gradient-to-tr from-gradBg px-3 pb-6'>
            <h1 className='py-6 text-xl font-bold'>Create Listing</h1>

            <div className=''>
                <form onSubmit={onSubmit} className='my-4 py-4 px-2 border-2 border-transparent bg-white rounded-xl text-black'>
                    <label className='font-bold'>Flat / Independent House</label>
                    <div className='flex gap-4 py-2 pb-4'>
                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:scale-110 hover:text-white ani" + (type === "flat" ? " bg-mainBg text-white" : "bg-transparent")}
                        id="type"
                        value="flat"
                        onClick={onMutate}
                        >
                          Flat
                        </button>

                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:text-white hover:scale-110 ani" + (type === "house" ? "text-white bg-mainBg text-white" : "bg-transparent")}
                        id="type"
                        value="house"
                        onClick={onMutate}
                        >
                          House
                        </button>
                    </div>

                    <label className='font-bold '>Name</label>
                    <input 
                    type="text"
                    value={name}
                    id="name"
                    placeholder='Name'
                    className='border-2 border-black block w-[50%] px-2 py-2 font-bold bg-transparent rounded mt-1 mb-4'
                    onChange={onMutate}
                    />

                    <div className='flex gap-6 my-4'>
                      <div className=''>
                        <label className='font-bold'>Bedrooms</label>
                        <input
                        className='block border-2 border-black px-2 py-1 w-[70%] mx-auto rounded '
                        type='number'
                        id='bedrooms'
                        value={bedrooms}
                        min='1'
                        max='50'
                        onChange={onMutate}
                        />
                      </div>
                      <div className=''>
                        <label className='font-bold'>Bathrooms</label>
                        <input
                        className='block border-2 border-black px-2 py-1 w-[70%] mx-auto rounded '
                        type='number'
                        id='bathrooms'
                        value={bathrooms}
                        min='1'
                        max='50'
                        onChange={onMutate}
                        />
                      </div>

                    </div>

                    <label className='font-bold'>Parking</label>
                    <div className='flex gap-4 py-2 pb-4'>
                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:scale-110 hover:bg-mainBg hover:text-white ani" + (parking === true ? " text-white bg-mainBg" : "bg-transparent")}
                        value={true}
                        id="parking"
                        onClick={onMutate}
                        >
                          Yes
                        </button>

                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:text-white ani hover:scale-110" + (parking === false ? " text-white bg-mainBg" : "")}
                        value={false}
                        id="parking"
                        onClick={onMutate}
                        >
                          No
                        </button>
                    </div>

                    <label className='font-bold'>Furnished</label>
                    <div className='flex gap-4 py-2 pb-4'>
                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:scale-110 hover:text-white ani " + (furnished === true ? " text-white bg-mainBg" : "bg-transparent")}
                        value={true}
                        id="furnished"
                        onClick={onMutate}
                        >
                          Yes
                        </button>

                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:text-white ani hover:scale-110" + (furnished === false ? " text-white bg-mainBg" : "")}
                        value={false}
                        id="furnished"
                        onClick={onMutate}
                        >
                          No
                        </button>
                    </div>

                    <label className='font-bold '>Address</label>
                    <textarea
                    type="text"
                    value={address}
                    id="address"
                    placeholder='address'
                    className='border-2 border-black block w-[50%] px-2 py-2 bg-transparent rounded mt-1 mb-4 '
                    onChange={onMutate}
                    required
                    />

                    <label className='font-bold'>Offer</label>
                    <div className='flex gap-4 py-2 pb-4'>
                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:scale-110 hover:text-white ani " + (offer === true ? " text-white bg-mainBg" : "bg-transparent")}
                        id="offer"
                        value={true}
                        onClick={onMutate}
                        >
                          Yes
                        </button>

                        <button 
                        type="button"
                        className={"border-2 border-mainBg px-3 py-2 rounded hover:border-transparent hover:bg-mainBg hover:text-white ani hover:scale-110" + (offer === false ? " text-white bg-mainBg" : "")}
                        id="offer"
                        value={false}
                        onClick={onMutate}
                        >
                          No
                        </button>
                    </div>

                    <div className='flex gap-6 my-4'>
                      <div className=''>
                        <label className='font-bold'>Regular Price</label>
                        <div className='flex gap-4 items-center'>
                          <input
                            className='flex border-2 border-black px-2 py-1 w-[50%]  rounded mt-2'
                            type='number'
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onMutate}
                            min='50'
                            max='7500000'
                            required
                          />
                          <p className='font-bold'>Rs./Month</p>
                        </div>
                      </div>
                    </div>
                    {offer && (
                      <div className='flex gap-6 my-4'>
                      <div className=''>
                        <label className='font-bold'>Discounted Price</label>
                        <div className='flex gap-4 items-center'>
                          <input
                            className='flex border-2 border-black px-2 py-1 w-[50%]  rounded mt-2'
                            type='number'
                            id='discountedPrice'
                            value={discountedPrice}
                            onChange={onMutate}
                            min='50'
                            max='75000000'
                            required
                          />
                          <p className='font-bold'>Rs./Month</p>
                        </div>
                        
                      </div>
                    </div>
                    )}
                    
                    <div className=''>
                      <label className='font-bold'>Images</label>
                      <p className='text-black/60 font-sm mb-2'>The first image will be the cover. (max 6)</p>

                      <input
                        className='formInputFile flex justify-center items-center cursor-pointer w-[80%]'
                        type='file'
                        id='imgUrls'
                        onChange={onMutate}
                        max='6'
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                      />
                    </div>

                    <button type='submit' className='mt-4 border-2 border-mainBg text-mainBg px-2 py-1 rounded md:px-3 md:py-2 hover:border-transparent hover:bg-mainBg hover:text-white font-bold hover:scale-110 mx-auto flex ani'>
                      Create Listing
                    </button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateListing