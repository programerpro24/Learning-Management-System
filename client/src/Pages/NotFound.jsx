import {useNavigate} from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate(); 



  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="mb-4">
            <svg className="w-24 h-24 text-indigo-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-500">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Call to Action Button */}
        <button onClick={()=>navigate(-1)} className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105">
         Go Back
        </button> 
      </div>
    </div>
  );
};


export default NotFoundPage; 
