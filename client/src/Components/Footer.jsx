//import react-icons  
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";



function Footer() {
  const currentDate = new Date(); 
  const year = currentDate.getFullYear(); 
  return (
     <>
       <footer className="relative h-auto sm:h-[20vh] flex flex-col sm:flex-row text-white bg-teal-900 w-full py-5 items-center justify-between">
          <section className="text-lg items-center justify-between">
            Copyright @ {year} || All rights reserved 
          </section>

          <section className="flex items-center justify-center gap-5 text-2xl text-white">
           <a className="hover:text-fuchsia-900 transition-all ease-in-out duration-300"><BsFacebook/></a>

           <a className="hover:text-fuchsia-900 transition-all ease-in-out duration-300"><BsInstagram/></a>

           <a className="hover:text-fuchsia-900 transition-all ease-in-out duration-300"><BsYoutube/></a>

           <a className="hover:text-fuchsia-900 transition-all ease-in-out duration-300"><BsLinkedin/></a>

           <a className="hover:text-fuchsia-900 transition-all ease-in-out duration-300"><BsTwitter/></a>
          </section>
        </footer>
     </>
  )
}

export default Footer