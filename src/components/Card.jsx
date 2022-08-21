import React from 'react'
import { Link} from 'react-router-dom'

const Card = ({ imgUrl, title, category }) => {
  return (
    <Link to={`/${category}`}>
        <div className='p-3 py-5 rounded-xl bg-gradient-to-tr from-slate-600 hover:cursor-pointer my-12 mx-4'>
            <div className='rounded-2xl'>
                <img className=' md:h-[250px] object-cover rounded-t-2xl' src={imgUrl} alt={title}/>

                <div className="bg-white text-mainBg p-3 rounded-b-2xl">
                    <h3 className='text-xl font-bold'>{title}</h3>
                </div>
            </div>
        </div>
    </Link>
    
  )
}

export default Card