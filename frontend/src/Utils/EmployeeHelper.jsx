import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const fetchDept = async () => {
    let departments;
    try {
        const response = await fetch("http://localhost:5000/api/department", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        });

        const resData = await response.json();

        if (resData.success) {
        
            departments = resData.departments

        
        } else {
        toast.error("Failed to fetch departments");
        }

    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    }
    return departments
};


export const fetchEmployees = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/employee", {
            method : "GET" ,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        });

        const resData = await response.json();
        console.log("the data" , resData)
        if (resData.success) {
            let sno = 1;
            const employees = resData.employees.map(emp => ({
                _id: emp._id,
                sno: sno++,
                employeeId: emp.employeeId,
                dob: new Date(emp.dob).toLocaleDateString(),
                department: emp.department,
                salary: emp.salary,
                name: emp.userId?.name || 'N/A',             
                profileImage: <img 
                    // width={50}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                    src={`http://localhost:5000/${emp.userId?.profileImage}`}
                    />|| null,     
            }));
            return employees
        } else {
        toast.error("Failed to fetch departments");
        }

    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    }
};


export const columns = () => [
    {
        name : "S No" ,
        selector :(row) => row.sno
    },
    {
        name : "Name" ,
        selector : (row) => row.name
    },
    {
        name : "image" ,
        selector : (row) => row.profileImage
    },
    {
        name : "department" ,
        selector : (row) => row.dep_name
    },
    {
        name : "Dob" ,
        selector : (row) => row.dob
    },
  {
    name: "Action",
    cell: (row) => (
      <EmployeesButtons _id={row._id} />
    )
  }
]



export const EmployeesButtons = ({_id}) =>{

    return (
        <div className="flex space-x-3">
            <button 
                // onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
                className="px-3 py-1 bg-gray-400 text-white">
                View
            </button>
            <button 
                // onClick={() => handleDelete(_id)}
                className="px-3 py-1 bg-blue-600 text-white">
                    Edit
            </button>
        </div>
    )
}

