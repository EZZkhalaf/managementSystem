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
    width: "5vw",  // ≈ small fixed
    center: true,
    wrap: true,
  },
  {
    name: "Name",
    selector: row => row.name,
    width: "12vw", // narrower than before
    wrap: true,
  },
  {
    name: "Image",
    cell: row => (
      <img
        src={`http://localhost:5000/${row.profileImage}`}
        alt="Profile"
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
    width: "6vw", // tighter image column
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: "Department",
    selector: row => row.department?.dep_name,
    width: "12vw",
    wrap: true,
  },
  {
    name: "DOB",
    selector: row => row.dob,
    width: "9vw",
    wrap: true,
  },
  {
    name: "Action",
    cell: row => <EmployeesButtons _id={row._id} />,
    width: "18vw", // Enough for 4 small buttons
    wrap: true,
  }
];






export const EmployeesButtons = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-1 justify-center items-center whitespace-nowrap overflow-hidden">
      <button
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
        className="px-2 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition whitespace-nowrap min-w-[45px]"
      >
        View
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
        className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition whitespace-nowrap min-w-[45px]"
      >
        Edit
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
        className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition whitespace-nowrap min-w-[45px]"
      >
        Salary
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
        className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition whitespace-nowrap min-w-[45px]"
      >
        Leaves
      </button>
    </div>
  );
};


