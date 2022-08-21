
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { BsBagCheck, BsFillBagCheckFill, BsPerson, BsPersonFill } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if(route === location.pathname){
            return true
        }
    }

  return (
    <div className='flex fixed w-full bottom-5 z-[1000]'>
        <div className="mx-auto relative">
                <ul className='flex gap-8 text-3xl border-2 border-transparent px-4 py-2 items-center'>
                    <li className='cursor-pointer' onClick={() => navigate('/')}>
                        {pathMatchRoute('/') ? <AiFillHome className='text-white'/> : <AiOutlineHome/> }
                    </li>
                    <li className='cursor-pointer' onClick={() => navigate('/offers')}>
                        {pathMatchRoute('/offers') ? <BsFillBagCheckFill className='text-white'/> : <BsBagCheck/> }
                    </li>
                    <li className='cursor-pointer' onClick={() => navigate('/profile')}>
                        {pathMatchRoute('/profile') ? <BsPersonFill className='text-white'/> : <BsPerson/> }
                    </li>
                </ul>

            <div className='absolute top-0 left-0'>
            <div className='mx-auto bg-slate-600 rounded-full opacity-70'>
            <ul className='flex gap-8 text-3xl border-2 border-transparent px-4 py-2 items-center'>
                    <li className='cursor-pointer' onClick={() => navigate('/')}>
                        {pathMatchRoute('/') ? <AiFillHome className='text-white'/> : <AiOutlineHome/> }
                    </li>
                    <li className='cursor-pointer' onClick={() => navigate('/offers')}>
                        {pathMatchRoute('/offers') ? <BsFillBagCheckFill className='text-white'/> : <BsBagCheck/> }
                    </li>
                    <li className='cursor-pointer' onClick={() => navigate('/profile')}>
                        {pathMatchRoute('/profile') ? <BsPersonFill className='text-white'/> : <BsPerson/> }
                    </li>
                </ul>
            </div>
            </div>
        </div>
        
    </div>
  )
}

export default Footer