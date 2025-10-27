
const sampleCourses = [
  // 1. Web Development
  {
    title: "MERN Stack: Build a Full E-commerce Website",
    description: "Master the complete MERN stack (Mongo, Express, React, Node) by building a fully functional e-commerce platform from scratch.",
    category: "Web Development",
    thumbnail: { public_id: "mern_course_thumb_id", secure_url: "https://sample.com/images/mern_thumb.jpg" },
    lectures: [
      { title: "Intro to MongoDB & Express Setup", description: "Setting up the backend structure.", lecture: { public_id: "mern_lec_01", secure_url: "https://sample.com/videos/mern/l1.mp4" } }
    ],
    numbersOfLectures: 1,
    createdBy: "Amit Sharma"
  },
  // 2. Data Science
  {
    title: "Python for Data Science: Pandas, NumPy, and Matplotlib",
    description: "Learn essential data manipulation, analysis, and visualization techniques using Python's core libraries.",
    category: "Data Science",
    thumbnail: { public_id: "ds_python_thumb_id", secure_url: "https://sample.com/images/ds_python_thumb.jpg" },
    lectures: [
      { title: "Introduction to Pandas DataFrames", description: "Loading and manipulating data using Pandas.", lecture: { public_id: "ds_lec_01", secure_url: "https://sample.com/videos/ds/l1.mp4" } }
    ],
    numbersOfLectures: 1,
    createdBy: "Priya Singh"
  },
  // 3. Cloud Computing
  {
    title: "AWS Certified Cloud Practitioner - Full Prep Course",
    description: "A complete guide to understanding AWS architecture, services, and security for the CCP certification exam.",
    category: "Cloud Computing",
    thumbnail: { public_id: "aws_cloud_thumb_id", secure_url: "https://sample.com/images/aws_cloud_thumb.jpg" },
    lectures: [],
    numbersOfLectures: 0,
    createdBy: "Vikram Menon"
  },
  // 4. Mobile Development
  {
    title: "iOS 17 Development with Swift and SwiftUI",
    description: "Build modern, responsive iOS applications from scratch using the latest Swift and declarative SwiftUI framework.",
    category: "Mobile Development",
    thumbnail: { public_id: "ios_swift_thumb_id", secure_url: "https://sample.com/images/ios_swift_thumb.jpg" },
    lectures: [
      { title: "SwiftUI Basics and Views", description: "Creating basic UI components and understanding View structure.", lecture: { public_id: "ios_lec_01", secure_url: "https://sample.com/videos/ios/l1.mp4" } },
      { title: "State and Data Flow in SwiftUI", description: "Managing application state using @State.", lecture: { public_id: "ios_lec_02", secure_url: "https://sample.com/videos/ios/l2.mp4" } }
    ],
    numbersOfLectures: 2,
    createdBy: "Riya Kapoor"
  },
  // 5. Cyber Security
  {
    title: "Ethical Hacking: Network Penetration Testing Guide",
    description: "Learn professional network scanning, vulnerability assessment, and securing systems against cyber threats.",
    category: "Cyber Security",
    thumbnail: { public_id: "hacking_thumb_id", secure_url: "https://sample.com/images/hacking_thumb.jpg" },
    lectures: [
      { 
        title: "Introduction to Kali Linux and Nmap", 
        description: "Setting up a testing environment and basic scanning tools.", 
        lecture: 
        { 
          public_id: "hack_lec_01", 
          secure_url: "https://sample.com/videos/hack/l1.mp4" 
        } 
      }
    ],
    numbersOfLectures: 1,
    createdBy: "Sameer Khan"
  }
];

export default sampleCourses; 