import HomeLayout from '../Layouts/HomeLayout.jsx'
import HomeImage from '../assets/homePageMainImage.png'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <HomeLayout>
         <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
           <div className='width-1/2 space-y-6'>
              <h1 className='text-4xl font-semibold text-center '>
                Find Out Best 
                <span className='text-yellow-500'> Online Courses</span>
              </h1>
              <p className='text-xl text-gray-200'>
               I have a skilled and well-qualified teacher to teach you. 
              </p>
              <div className='space-x-6'>
                <Link to='/courses' className=" btn bg-amber-300 hover:bg-amber-400 text-white font-bold py-3 px-4 rounded">Explore courses</Link>
                
                <Link to='/contact' className=" btn bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded">Contact Us</Link>                
              </div>
           </div>
           <div className='w-1/2 flex items-center justify-center '>
          <img src={HomeImage} alt="loading... "/>
           </div>
        </div>
        </HomeLayout>
    </div>
  )
}

export default HomePage