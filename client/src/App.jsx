//import css files
import './App.css'

//import libraries 
import { Routes, Route } from 'react-router-dom'

//import components 
import HomePage from './Pages/HomePage'
import About from './Pages/About'
import Footer from './Components/Footer'
import NotFoundPage from './Pages/NotFound.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import CourseList from './Pages/course/CourseList.jsx'
import Contact from './Pages/Contact.jsx'
import Denied from './Pages/Denied.jsx'
import CourseDescription from './Pages/course/CourseDescription.jsx'
import RequireAuth from './Components/Auth/RequireAuth.jsx'
import CreateCourse from './Pages/course/CreateCourse.jsx'
import Profile from './Pages/user/Profile.jsx'
import EditProfile from './Pages/user/EditProfile.jsx'
import AddLectures from './Pages/dashboard/AddLecture.jsx'
import DisplayLectures from './Pages/dashboard/DisplayLectures.jsx'


function App() {
  return (
    <div>
    <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/courses' element={<CourseList/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/denied' element={<Denied/>}/>
       <Route path='/course/description' element={<CourseDescription/>}/>

       <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
       <Route path='/course/create' element={<CreateCourse/>} />
        <Route path='/course/displaylectures' element={<DisplayLectures/>}/>
        <Route path='/course/addlecture' element={<AddLectures/>}/>
       </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path='/user/profile' element={<Profile/>}/>
        <Route path='/user/editprofile' element={<EditProfile/>}/>

       
        </Route>

       <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
