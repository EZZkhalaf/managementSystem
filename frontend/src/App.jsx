
import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom"
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import './App.css'
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import Register from "./Pages/Register";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import PrivateRoutes from "./Utils/PrivateRoutes";
import RoleBasedRoutes from "./Utils/RoleBasedRoutes";

const App = () =>{

  return (
    <AnimatePresence mode = 'wait'>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element = {<Navigate to = "admin-dashboard"/>} ></Route>
          <Route path="/login" element = {<Login />} ></Route>
          <Route path="/register" element = {<Register />} ></Route>
          <Route path="/admin-dashboard" element = {
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
            } ></Route>
          <Route path="/employee-dashboard" element = {
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
            } ></Route>
        </Routes>
      {/* </BrowserRouter> */}
      
            
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </AnimatePresence>
  )
}

export default App;
