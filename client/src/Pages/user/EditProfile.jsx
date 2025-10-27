import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, getUserData } from "../../Redux/Slices/AuthSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast"; // 1. Toast ko import kiya

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. User data ko Redux se top level par fetch kiya
  const userData = useSelector((state) => state?.auth?.data);

  // 3. State ko userData se pre-fill kiya
  const [data, setData] = useState({
    // Pehle se maujood avatar ya blank string
    previewImage: userData?.avatar?.secure_url || "", 
    // Pehle se maujood naam ya blank string
    fullName: userData?.fullName || "",
    // Nayi file ke liye (shuru mein undefined)
    avatar: undefined, 
  });

  // 4. 'userInput' ki jagah 'data' aur 'setData' ka istemaal kiya
  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  // 5. 'userInput' ki jagah 'data' aur 'setData' ka istemaal kiya
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  // 6. Form submission logic ko 'signupData' ki jagah 'data' se fix kiya
  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.fullName) {
      toast.error("Please fill in your full name");
      return;
    }

    if (data.fullName.length < 3) {
      toast.error("Name should be at least 3 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);

    // Sirf tabhi avatar append karein jab user ne nayi image select ki ho
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    // 7. Redux se fetch kiye gaye 'userData._id' ka istemaal kiya
    await dispatch(updateProfile([userData?._id, formData]));
    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        {/* 8. Form tag add kiya aur onFormSubmit handler lagaya */}
        <form
          onSubmit={onFormSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Edit Profile
          </h2>

          <div className="flex flex-col items-center mb-6">
            {/* 9. Image preview UI ko fix kiya */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-50 flex items-center justify-center">
              {data.previewImage ? (
                <img
                  src={data.previewImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <BsPersonCircle className="w-full h-full text-gray-400" />
              )}
            </div>

            <label
              htmlFor="image_uploads"
              className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Upload Image
            </label>
            <input
              id="image_uploads"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Full Name input field */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              name="fullName" 
              value={data.fullName} 
              onChange={handleUserInput}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <Link
            to="/user/profile"
            className="block w-full text-center mt-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go to profile
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;

















// import HomeLayout from "../../Layouts/HomeLayout.jsx";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateProfile, getUserData } from "../../Redux/Slices/AuthSlice.js";
// import { useNavigate } from "react-router-dom";
// import { BsPersonCircle } from "react-icons/bs";

// function EditProfile() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     previewImage: "",
//     fullName: "",
//     avatar: undefined,
//     userId: useSelector((state) => state?.auth?.data?._id),
//   });

//   function handleUserInput(e) {
//     const { name, value } = e.target;
//     setUserInput({
//       ...userInput,
//       [name]: value,
//     });
//   }

//   function handleImageUpload(e) {
//     e.preventDefault();
//     const uploadedImage = e.target.files[0];
//     if (uploadedImage) {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.addEventListener("load", function () {
//         setUserInput({
//           ...userInput,
//           previewImage: this.result,
//           avatar: uploadedImage,
//         });
//       });
//     }
//   }

//   async function onFormSubmit(e) {
//     e.preventDefault();

//     if (!signupData.fullName || !signupData.avatar) {
//       toast.error("Please Fill All The Details");
//       return;
//     }

//     if (signupData.fullName.length < 3) {
//       toast.error("Name should be alteast 3 character");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("fullName", signupData.fullName);
//     formData.append("avatar", signupData.avatar);

//     await dispatch(updateProfile(data.userId, formData));
//     await dispatch(getUserData());

//     // setSignupData({
//     //   fullName: "",
//     //   avatar: "",
//     //   previewImage:""
//     // });

//     navigate("/user/profile");
//   }

//   return (
//     <HomeLayout>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//         <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//           <h2 className="text-2xl font-semibold mb-6 text-center">
//             Edit Profile
//           </h2>
//           <div className="flex flex-col items-center mb-6">
//             <label
//               htmlFor="image_uploads"
//               className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               {data.previewImage ? (
//                 <img
//                   className="w-24 h-24 rounded-full m-auto"
//                   src={data.previewImage}
//                 />
//               ) : (
//                 <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
//               )}
//             </label>
//             <input
//               id="image_uploads"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange = {handleImageUpload}            
//             />
//           </div>

//           {/* Full Name input field */}
//           <div className="mb-4">
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               type="text"
//               placeholder="Enter your full name"
//               // value and onChange handlers removed
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Save button */}
//           <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }

// export default EditProfile;
