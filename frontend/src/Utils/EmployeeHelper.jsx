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
                profileImage: emp.userId?.profileImage     
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

export const fetchEmployee = async(id)=>{
    try {
        const response = await fetch(`http://localhost:5000/api/employee/${id}`, {
            method : "GET" ,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data= await response.json();
        return data
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong"); 
    }
}



export const columns = () => [
  {
    name: "S No",
    selector: row => row.sno,
    width: "60px",
    center: true,
    wrap: true,
  },
  {
    name: "Name",
    selector: row => row.name,
    grow: 2,
    wrap: true,
  },
  {
    name: "Image",
    cell: row => (
      <img
        src={`http://localhost:5000/${row.profileImage}`}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
    width: "80px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: "Department",
    selector: row => row.department?.dep_name,
    grow: 2,
    wrap: true,
  },
  {
    name: "DOB",
    selector: row => row.dob,
    grow: 1,
    wrap: true,
  },
  {
    name: "Action",
    cell: row => <EmployeesButtons _id={row._id} />,
    grow: 2,
    wrap: true,
  }
];





export const EmployeesButtons = ({_id}) =>{
    const navigate = useNavigate()
    return (
        <div className="flex gap-2 w-fit justify-center items-center">
        <button
            onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            className="px-4 py-1 min-w-[70px] bg-gray-500 text-white rounded hover:bg-gray-600 transition whitespace-nowrap"
        >
            View
        </button>

        <button
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
            className="px-4 py-1 min-w-[70px] bg-blue-600 text-white rounded hover:bg-blue-700 transition whitespace-nowrap"
        >
            Edit
        </button>

        <button
            className="px-4 py-1 min-w-[70px] bg-yellow-500 text-white rounded hover:bg-yellow-600 transition whitespace-nowrap"
        >
            Salary
        </button>
        </div>


    )
}

