
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
import AdminSummary from "./Components/Dashboard/AdminSummary";
import DepartmentsList from "./Components/Departments/DepartmentsList";
import AddDepartment from "./Components/Departments/AddDepartment";
import EditDepartment from "./Components/Departments/EditDepartment";
import EmployeeList from "./Components/Employee/EmployeeList";
import AddEmployee from "./Components/Employee/AddEmployee";
import EmployeeInfo from "./Components/Employee/EmployeeInfo";
import EditEmployee from "./Components/Employee/EditEmployee";

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
            } >
              {/* nested routes here  */}
              <Route index element={<AdminSummary />} ></Route>
              <Route path="/admin-dashboard/departments" element = {<DepartmentsList />}></Route>
              <Route path="/admin-dashboard/add-department" element = {<AddDepartment />}></Route>
              <Route path="/admin-dashboard/department/:id" element = {<EditDepartment />}></Route>


              <Route path="/admin-dashboard/employees" element = {<EmployeeList />}></Route>
              <Route path="/admin-dashboard/employees/:id" element = {<EmployeeInfo />}></Route>
              <Route path="/admin-dashboard/employees/edit/:id" element = {<EditEmployee />}></Route>
              <Route path="/admin-dashboard/add-employee" element = {<AddEmployee />}></Route>
            </Route>
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
