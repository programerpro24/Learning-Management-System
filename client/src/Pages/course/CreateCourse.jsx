import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }


  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("All Fields Are Required");
      return;
    }

    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("category", userInput.category);
    formData.append("createdBy", userInput.createdBy);
    formData.append("description", userInput.description);
    formData.append("thumbnail", userInput.thumbnail);
    
    const response = await dispatch(createNewCourse(formData));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 relative overflow-hidden">
        {/* Subtle glowing gradient behind form */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

        {/* Form Container */}
        <form
          onSubmit={onFormSubmit}
          className="m-10 sm:m-20 relative flex flex-col gap-5 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 sm:p-8 w-full max-w-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 ease-in-out"
        >
          {/* Back button */}
          <Link
            to="/"
            className="absolute top-4 left-4 text-2xl text-accent cursor-pointer hover:text-purple-400 transition"
          >
            <AiOutlineArrowLeft />
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Create New Course
          </h1>

          {/* BUG FIX 4 & 5: Layout ko 'flex-col' mein badla gaya hai. 'grid-col-2' galat class thi aur layout toota hua tha. */}
          <main className="flex flex-col gap-4">
            {/* Image Upload Section */}
            <div>
              <label
                htmlFor="image_uploads"
                className="cursor-pointer block w-full h-48 border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-purple-400 transition duration-300 ease-in-out bg-gray-800/50 backdrop-blur-sm"
              >
                {userInput.previewImage ? (
                  <img
                    src={userInput.previewImage}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-300">
                    <h1 className="font-semibold text-lg">
                      Upload Course Thumbnail
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                      Click to browse or drag & drop
                    </p>
                  </div>
                )}
              </label>
              <input
                id="image_uploads"
                name="image_uploads"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Fields (Title, CreatedBy, Category) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-md font-semibold text-gray-300">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter Title"
                  type="text"
                  value={userInput.title}
                  onChange={handleUserInput} // BUG FIX 1
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-md font-semibold text-gray-300">
                  Created By
                </label>
                <input
                  id="createdBy"
                  name="createdBy"
                  placeholder="Enter Instructor Name"
                  type="text"
                  value={userInput.createdBy}
                  onChange={handleUserInput} // BUG FIX 1
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-md font-semibold text-gray-300">
                Category
              </label>
              <input
                id="category"
                name="category"
                placeholder="Enter Course Category"
                type="text"
                value={userInput.category}
                onChange={handleUserInput} // BUG FIX 1
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-md font-semibold text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Course Description"
                value={userInput.description}
                onChange={handleUserInput} // BUG FIX 1
                className="w-full h-[150px] p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none"
              />
            </div>
          </main>

          <button
            type="submit" // BUG FIX 6: Button type add kiya
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-lg p-2 text-lg mt-4 font-bold cursor-pointer text-gray-900" // BUG FIX 7
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;















// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import HomeLayout from "../../Layouts/HomeLayout";
// import { AiOutlineArrowLeft } from "react-icons/ai";

// function CreateCourse() {
//   const [userInput, setUserInput] = useState({
//     title: "",
//     category: "",
//     createdBy: "",
//     description: "",
//     thumbnail: "",
//     previewImage: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

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
//           thumbnail: uploadedImage,
//         });
//       });
//     }
//   }

//   function handleUserInpute(e) {
//     const { name, value } = e.target;

//     setUserInput({
//       ...userInput,
//       [name]: value,
//     });
//   }

//   async function onFormSubmit(e) {
//     e.preventDefault();

//     if (
//       !userInput.title ||
//       !userInput.category ||
//       !userInput.createdBy ||
//       !userInput.description ||
//       !userInput.thumbnail
//     ) {
//       toast.error("All Fields Are Required");
//       return;
//     }

//     const response = await dispatch(userInput);

//     if (response?.payload?.success) {
//       setUserInput({
//         title: "",
//         category: "",
//         createdBy: "",
//         description: "",
//         thumbnail: "",
//         previewImage: "",
//       });

//       navigate("/courses");
//     }
//   }

//   return (
//     <HomeLayout>
//       <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 relative overflow-hidden">
//         {/* Subtle glowing gradient behind form */}
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full"></div>
//         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

//         {/* Form Container */}
//         <form onSubmit={onFormSubmit}
//          className=" m-20 relative flex flex-col gap-5 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-in-out">
//           {/* Back button */}
//           <Link
//             to="/"
//             className="absolute top-4 left-4 text-2xl text-accent cursor-pointer hover:text-purple-400 transition"
//           >
//             <AiOutlineArrowLeft />
//           </Link>

//           {/* Title */}
//           <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//             Create New Course
//           </h1>

//           <main className="grid grid-col-2 gap-x-2">
//             <div className="gap-y-6">
//               <div>
//                 <label
//                   htmlFor="image_uploads"
//                   className="cursor-pointer block w-full h-48 border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-purple-400 transition duration-300 ease-in-out bg-gray-800/50 backdrop-blur-sm"
//                 >
//                   {userInput.previewImage ? (
//                     <img
//                       src={userInput.previewImage}
//                       alt="Course Thumbnail"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center justify-center text-gray-300">
//                       <h1 className="font-semibold text-lg">
//                         Upload Course Thumbnail
//                       </h1>
//                       <p className="text-sm text-gray-400 mt-1">
//                         Click to browse or drag & drop
//                       </p>
//                     </div>
//                   )}
//                 </label>
//                 <input
//                   id="image_uploads"
//                   name="image_uploads"
//                   type="file"
//                   accept=".jpg, .jpeg, .png"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </div>
//               <div className="flex flex-col gap-4 mt-4">
//                 <label
//                   htmlFor="title"
//                   className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
//                 >
//                   Title
//                 </label>
//                 <input
//                   id="title"
//                   name="title"
//                   placeholder="Enter Title"
//                   type="text"
//                   value={userInput.title}
//                   onChange={handleUserInpute}
//                   className=" w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
//                 />
//               </div>

//               <div className="flex flex-col gap-4 mt-4">
//                 <label
//                   htmlFor="createdBy"
//                   className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
//                 >
//                   CreatedBy
//                 </label>
//                 <input
//                   id="createdBy"
//                   name="createdBy"
//                   placeholder="Enter Instructor Name"
//                   type="text"
//                   value={userInput.createdBy}
//                   onChange={handleUserInpute}
//                   className=" w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
//                 />
//               </div>

//               <div className="flex flex-col gap-4 mt-4">
//                 <label
//                   htmlFor="category"
//                   className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
//                 >
//                   category
//                 </label>
//                 <input
//                   id="category"
//                   name="category"
//                   placeholder="Enter Course Category"
//                   type="text"
//                   value={userInput.category}
//                   onChange={handleUserInpute}
//                   className=" w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
//                 />
//               </div>

//               <div className="flex flex-col gap-4 mt-4">
//                 <label
//                   htmlFor="description"
//                   className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   placeholder="Enter Course Description"
//                   type="text"
//                   value={userInput.description}
//                   onChange={handleUserInpute}
//                   className=" w-full h-[150px] p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
//                 />
//               </div>
//             </div>
//           </main>
//           <button className="bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg p-1 text-lg mt-4 font-bold cursor-pointer">
//             create
//           </button>
//         </form>
//       </div>
//     </HomeLayout>
//   );
// }

// export default CreateCourse;
