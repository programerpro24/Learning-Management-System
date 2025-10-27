import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import  {useDispatch, useSelector }from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const isLoggedIn = useSelector((state) =>state?.auth?.isLoggedIn); 
  const role = useSelector((state)=>state?.auth?.role); 




  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    if (drawerSide[0]) drawerSide[0].style.width = "250px"; // open width
  }

  function hideDrawer() {
    const drawerToggle = document.getElementsByClassName("drawer-toggle");
    if (drawerToggle[0]) drawerToggle[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    if (drawerSide[0]) drawerSide[0].style.width = "0"; // close drawer
  }

  async function handleLogout(e){
  const res = await dispatch(logout())
  console.log(res.payload.success); 
  if(res?.payload?.success)
  navigate('/')
  }


  return (
    <div className="min-h-[90vh] bg-gray-500 relative">
      {/* Drawer */}
      <div className="drawer fixed left-0 top-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Drawer Menu Button */}
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer">
            <FiMenu
              onClick={changeWidth}
              size={32}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side w-full transition-all duration-300 overflow-hidden">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu bg-base-100 w-full sm:w-80 p-4 text-base-content relative h-[100%]">
            <li className="w-full absolute right-2 z-50 top-2 flex justify-end">
              <button onClick={hideDrawer} className="p-4">
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="mt-10">
              <Link to='/'>Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li className="mt-10">
                <Link to='/admin/dashboard'>Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <li className="mt-10">
                <Link to='/course/create'>Create Course</Link>
              </li>
            )}

            <li className="mt-10">
              <Link to='/courses'>All courses</Link>
            </li>
            <li className="mt-10">
            <Link to='/contact'>Contact Us</Link>  
            </li>
            <li className="mt-10">
            <Link to='/about'>About</Link>  
            </li>
            {!isLoggedIn && 
            <li className="absolute bottom-4 left-0">
              <div className="flex justify-between w-full gap-[25px]">
                <Link to='/login' className="btn w-[100px] bg-indigo-500  py-2 font-semibold rounded-md">Login</Link>
                <Link to='/signup' className="btn w-[100px] bg-purple-500 py-2 font-semibold rounded-md">Signup</Link>              
              </div> 
            </li>}
            {isLoggedIn && 
            <li className="absolute bottom-4 left-0" > 
              <div className="m-2">
                <Link to='/user/profile' className="bg-indigo-500 px-4 py-2 font-semibold rounded-md mr-[30px]">Profile</Link>
                <Link onClick={handleLogout} className="bg-purple-500 px-4 py-2 font-semibold rounded-md mr-[50px]">Logout</Link>              
              </div> 
            </li>}
          </ul>
        </div>
      </div>

      {/* Render page content here */}
      <Toaster position="top-center" reverseOrder={false} />
      <main className="pl-16">{children}</main>
    </div>
  );
}

export default HomeLayout;



















//import icons
// import { FiMenu } from "react-icons/fi";
// import { AiFillCloseCircle } from "react-icons/ai";



// function HomeLayout() {

//     function changeWidh(){
//         const drawerSide = document.getElementsByClassName("drawer-side"); 
//         drawerSide[0].style.width=0; 
//     }

//     function hideDrawer(){
//         const hideDrawer = document.getElementsByClassName("drawer-toggle"); 
//         Element[0].checked=false;

//         changeWidh()
//     }


//   return (
//     <div className="min-h-[90vh] bg-gray-500">
//         <div className="drawer absolute left-0 z-50 w-fit bg-green-500 ">
//             <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content">
//                 <label htmlFor="my-drawer" className="cursor-pointer relative">O
//                     <FiMenu
//                     onClick={changeWidh}
//                     size={"32px"}
//                     className="font-bold text-white m-4" 
//                     />
//                 </label>
//             </div>
//             <div className="drawer-side w-0">
//                 <label htmlFor="my-drawer"  className="drawer-overlay"></label>
//                     <ul className="menu bg-base-100 w-48 sm:w-80 p-4 text-base-content relattive">
//                         <li className="w-full absolute right-2 z-50">
//                             <button onClick={hideDrawer}><AiFillCloseCircle size={24} /></button>
//                         </li>
//                         <li>Sidebar Item</li>
//                     </ul>
//               </div>
//          </div>
//     </div>
//   )
// }

// export default HomeLayout






// //import icons
// import { FiMenu } from "react-icons/fi";
// import { AiFillCloseCircle } from "react-icons/ai";

// function HomeLayout() {
//   // --- इन फंक्शन्स की कोई ज़रूरत नहीं है ---
//   // function changeWidh(){ ... }
//   // function hideDrawer(){ ... }
//   // ----------------------------------------

//   return (
//     <div className="min-h-[90vh] bg-gray-500">
//       {/* (FIX) 'w-fit' को 'drawer' पर ही रहने दें, यह ठीक है */}
//       <div className="drawer absolute left-0 z-50 w-fit">
        
//         {/* (FIX) ID को "my-drawer" कर दिया (या सभी 'htmlFor' को "my-drawer-1" करें) */}
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
//         <div className="drawer-content">
//           {/* (FIX) htmlFor को ID ("my-drawer") से मैच किया */}
//           <label htmlFor="my-drawer" className="cursor-pointer relative">
//             {/* (FIX) FiMenu से onClick हटा दिया गया */}
//             <FiMenu
//               size={"32px"}
//               className="font-bold text-white m-4"
//             />
//           </label>
//         </div>

//         {/* (FIX) 'w-0' क्लास हटा दी गई */}
//         <div className="drawer-side">
//           {/* (FIX) htmlFor को ID ("my-drawer") से मैच किया */}
//           <label htmlFor="my-drawer" className="drawer-overlay"></label>
          
//           {/* (FIX) 'relattive' को 'relative' किया */}
//           <ul className="menu bg-base-100 w-48 sm:w-80 p-4 text-base-content relative">
            
//             {/* (FIX) बंद करने के लिए 'button' की जगह 'label' का इस्तेमाल करें */}
//             <li className="w-full absolute right-2 z-50">
//               <label htmlFor="my-drawer" className="btn btn-ghost btn-sm btn-circle">
//                 <AiFillCloseCircle size={24} />
//               </label>
//             </li>
//             <li><a>Sidebar Item 1</a></li> {/* (लिंक के लिए <a> टैग जोड़ें) */}
//             <li><a>Sidebar Item 2</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeLayout;













