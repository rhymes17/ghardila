import React from 'react'
import Recommended from '../components/Recommended'
import rent from '../assests/rentCategoryImage.jpg'
import roomate from '../assests/sellCategoryImage.jpg'
import Card from '../components/Card'

const Main = () => {
  return (
    <div className='max-w-[90%] mx-auto h-full'>
        <Recommended />

        <div className="py-12">
          <h2 className='text-xl font-bold mb-6 p-15 '>Categories</h2>
          <div className="md:flex mx-auto justify-between max-w-[85%] xl:max-w-[55%]">
            <Card imgUrl={rent} title={'Flats'} category="flat"/>
            <Card imgUrl={roomate} title={'Independent Houses'} category="house"/>
          </div>
        </div>
    </div>
  )
}

export default Main