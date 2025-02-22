import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Forgotpassword from "./pages/Forgotpassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Myprofile from "./components/Dashboard/Myprofile";
import Error from "./pages/Error";
import Settings from "./components/Dashboard/Settings/index";
import EnrooledCourse from "./components/Dashboard/EnrooledCourse";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/Dashboard/AddCourse";
import MyCourses from "./components/Dashboard/MyCourses";
import { useSelector } from "react-redux";
import Generate from "./components/Dashboard/AiGEnerate/components/cores/Generate"
import CourseLayout from "./components/Dashboard/AiGEnerate/components/CourseLayout";
import FinishCourse from "./components/Dashboard/AiGEnerate/components/FinishCourse";
import Content from "./components/Dashboard/AiGEnerate/components/Content"
import EditCourse from "./components/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Cart from "./components/Dashboard/Cart/index";
import VideoDetails from "./components/Dashboard/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
 import Instructor from "./components/Dashboard/InstructorDashboard/Instructor"
 import Contact from "./pages/Contact";
function App() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/forgot-password" element={ < Forgotpassword/> }/>
    <Route path="/update-password/:id" element={ < UpdatePassword/> }/>
    <Route path="/verify-email" element={ <VerifyEmail/>  }/>
    <Route path="/about" element={ <About/>  }/>
    <Route path="/catalog/:catalogName" element={<Catalog/>}/>
    <Route path="/courses/:courseId" element={<CourseDetails/>}/>
    <Route
          path="/generate-course"
          element={
            <PrivateRoute>
              <Generate />
            </PrivateRoute>
          }
        />
       <Route
  path="/courselayout/:id"
  element={
    <PrivateRoute>
      <CourseLayout />
    </PrivateRoute>
  }
/>
<Route
  path="/create-course/:id/finish"
  element={
    <PrivateRoute>
      <FinishCourse />
    </PrivateRoute>
  }
/>
<Route
path="/view/course/:id"
element={
  <PrivateRoute>
    <Content/>
    </PrivateRoute>
}
/>

    <Route element={
      <PrivateRoute>
        <Dashboard/>
      </PrivateRoute>
    }>
       <Route path="dashboard/my-profile" element={<Myprofile/>}/>
       <Route path="dashboard/Settings" element={<Settings/>}/>
       {
              user?.accountType===ACCOUNT_TYPE.STUDENT && (
                <>
                    <Route path="/dashboard/enrolled-courses" element={<EnrooledCourse/>}/>
                    <Route path="/dashboard/cart" element={<Cart/>}/>
                    {/* <Route path="/dashboard/" */}
                </>
              )
            }
            
       {
        user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/add-course" element={<AddCourse/>} />
          <Route path="dashboard/my-courses" element={<MyCourses/>} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
          <Route path="/dashboard/instructor" element={<Instructor/>}/>
          </>
        )
       }
      </Route>


      <Route path="/contact" element={<Contact />} />
      
      <Route element={
              <PrivateRoute>
                <ViewCourse/>
              </PrivateRoute>

            }>
              {
                user?.accountType===ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails/>}
                    />
                  </>
                )
              }



            </Route>
      
     
    
   <Route path="*" element={<Error/>}/>
  
  </Routes>

 </div>
  );
}
 
export default App;
