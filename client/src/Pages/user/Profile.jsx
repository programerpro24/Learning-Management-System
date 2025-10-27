import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { logout } from "../../Redux/Slices/AuthSlice.js";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

function Profile() {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state?.auth?.data);
  const navigate = useNavigate(); 

  async function handleLogout(e) {
    e.preventDefault();
    const response = await dispatch(logout());
    if (response?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 text-white">
        <div className="relative bg-gray-900/70 border border-gray-700 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-2xl">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
              {
                 userdata?.avatar?.secure_url.trim() === "" ? 
                <BsPersonCircle className="w-[100px] h-[105px] rounded-full m-auto"/>:
                 <img
                src={ userdata?.avatar?.secure_url}
                alt="User Avatar"
                className="w-full h-full object-cover"
              /> 
              }
            </div>

            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {userdata?.fullName || "User Name"}
            </h1>
            <p className="text-gray-400 text-sm">
              {userdata?.email || "email@example.com"}
            </p>
            <span className="px-3 py-1 mt-1 bg-purple-500/20 border border-purple-500 rounded-full text-sm uppercase tracking-wide">
              {userdata?.role || "User"}
            </span>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-700"></div>

          {/* Info Section */}
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span className="font-semibold">User ID:</span>
              <span className="text-gray-400 truncate max-w-[200px]">
                {userdata?._id || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Created At:</span>
              {/* BUG FIX 3: Date formatting ko safe banaya */}
              <span className="text-gray-400">
                {userdata?.createdAt
                  ? new Date(userdata.createdAt).toLocaleDateString()
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Updated At:</span>
              <span className="text-gray-400">
                {userdata?.updatedAt
                  ? new Date(userdata.updatedAt).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <button onClick={()=>navigate('/user/editprofile')} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition">
              Edit Profile
            </button>
            <button
              onClick={handleLogout} 
              className="flex-1 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
