
import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom"
import './App.css'
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () =>{

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element = {<Navigate to = "admin-dashboard"/>} ></Route> */}
        <Route path="/" element = {<Login />} ></Route>
        <Route path="/admin-dashboard" element = {<AdminDashboard />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
