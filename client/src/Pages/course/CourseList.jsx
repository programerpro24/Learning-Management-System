import { useEffect } from 'react';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {getAllCourses} from '../../Redux/Slices/CourseSlice.js';
import CourseCard from '../../Components/CourseCard.jsx';

function CourseList() {

    const disptach = useDispatch(); 
    const {courseData} = useSelector((state)=>state.course); 

    async function loadCourses(){
       await disptach(getAllCourses()); 
    }

    useEffect(()=>{
        loadCourses(); 
    }, []); 

  return (
      <HomeLayout>
        <div className='min-h-[90vh] pl-20 pt-12 flex flex-col gap-10 text-white'>
            <h1 className='text-center text-2xl'> Explore The Courses Made By
                <span className='font-bold text-yellow-500 text-3xl'> Industry Experts</span>
            </h1>
            <div className='mb-10 flex flex-wrap gap-14 pt-12'>
                {courseData?.map((Element)=>{
                    return <CourseCard key={Element._id} data={Element}/>
                })}
            </div>
        </div>
      </HomeLayout>
  )
}

export default CourseList