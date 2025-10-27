import HomeLayout from '../Layouts/HomeLayout.jsx'
import aboutImage from '../assets/aboutMainImage.png'
import CarouselSlide from '../Components/CarouselSlide.jsx'
import slides from '../constant/Data.js'



function About() {
  return (
    <HomeLayout>
    <div className='pl-10 pt-20 flex flex-col text-white'>
        <div className='flex items-center gap-[70px] mx-10'>
            <section className='w-1/2 space-y-10'>
                <h1 className='text-6xl font-semibold'>
                  Focus on Transformation
                </h1>

                <p className='text-xl text-gray-200'>
                 Unlock your true potential. This course isn't just about learning; it's about transforming your career. Get the expert guidance and practical knowledge to achieve your goals.
                </p>
            </section>

            <div className='w-1/2'>
             <img
                src={aboutImage}
                alt="loading..."
                className="h-[70vh] w-auto rounded-2xl shadow-lg 
               transition-transform duration-700 ease-in-out 
               hover:scale-100 hover:rotate-3 hover:shadow-2xl hover:brightness-110"/>
            </div>
        </div>

        <div className='carousel m-auto w-1/2 my-16'>
            <CarouselSlide slides={slides}/>
        </div>
    </div>
</HomeLayout>
  )
}


export default About