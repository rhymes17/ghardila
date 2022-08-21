import React from 'react'

const Recommended = () => {

  return (
    <div>
        <div className='max-h-[550px] bg-cardBg bg-gradient-to-br
        from-gradBg rounded-2xl mb-9'>
            <div className='max-w-[90%] mx-auto py-5'>
                <h1 className='text-xl md:text-2xl font-bold'>How It Works?</h1>

                <h3 className='text-xl font-semibold my-2'>
                    GharDila is a Bro-To-Bro Home Finding Platform.
                </h3>
              <div className='my-4 grid md:grid-cols-2 gap-5'>
                <div className='border-2 border-transparent py-2 px-2 bg-white text-black rounded-xl hover:scale-105 ani'>
                  <h3 className='text-[1.2rem] pb-2'>If you are leaving your rented house</h3>
                  <p>Post a listing so that anyone who is in search of house can reach out to you and directly get a house without paying broker any charges.</p>
                </div>
                <div className='border-2 border-transparent py-2 px-2 bg-white text-black rounded-xl hover:scale-105 ani'>
                  <h3 className='text-[1.2rem] pb-2'>If you are in search of a house</h3>
                  <p>Find houses according to your need without paying any amount to broker.
                    <br/>
                    Directly contact your Bro currently living in that house.
                  </p>
                </div>
                
              </div>
            </div>
        </div>
    </div>
  )
}

export default Recommended