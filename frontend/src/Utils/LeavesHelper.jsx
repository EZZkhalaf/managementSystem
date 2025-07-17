import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export const columns = () => [
  {
    name: "S No",
    selector: row => row.sno,
    width: "60px",
    center: true,
    wrap: true,
  },
  {
    name: "Leave Type",
    selector: row => row.leaveType,
    width: "100px",
    wrap: true,
  },
  {
    name: "From",
    selector: row => row.name,
    grow: 2,
    wrap: true,
  },
  {
    name: "To",
    selector: row => row.leaveType,
    grow: 1,
    wrap: true,
  },
  {
    name: "Description",
    selector: row => row.description,
    grow: 2,
    wrap: true,
  },
  {
    name: "Applied Date",
    selector: row => row.AppliedDate,
    width: "80px",
    center: true,
    wrap: true,
  },
  {
    name: "Status",
    selector: row => row.status,
    width: "100px",
    center: true,
    wrap: true,
  },
  {
    name: "Action",
    cell: row => <LeavesButton Id={row._id} />,
    grow: 2,
    wrap: true,
  }
];


export const LeavesButton = ({_id}) =>{
    const navigate = useNavigate();
    return (
        <div className="flex gap-2 w-fit justify-center items-center">
            <button
                onClick={() => navigate(`/admin-dashboard/leave/${_id}`)}
                className="px-4 py-1 min-w-[70px] bg-gray-500 text-white rounded hover:bg-gray-600 transition whitespace-nowrap"
            >
                View
            </button>
       </div>


    )
}


export const addLeave = async (formdata , navigate) => {
    
    try {
        const response = await fetch("http://localhost:5000/api/leave/add", {
            method : "post" ,
            headers: {
                "Content-Type" : 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            } , 
            body : JSON.stringify(formdata)
        });
        const data = await response.json();
        console.log(data)
        if(data.success){
            navigate("/employee-dashboard/leaves/")
            toast.success("added the leave successfully");
            return data;
        }else {
        toast.error("Failed to fetch departments");
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    }
};

export const fetchLeaves = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/leaves", {
            method : "GET" ,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        const resData = await response.json();
        if (resData.success) {
            let sno = 1;
            const data = await response.data.leaves.map((leave) => ({
                _id: leave._id,
                sno: sno++,
                employeeId: leave.employeeId.employeeid,
                name: leave.employeeId.userId.name,
                leaveType: leave.leaveType,
                department: leave.employeeId.department.name,
                days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                status: leave.status,
                action: <LeavesButton Id={leave._id} />,
            }));
            return data
        } else {
        toast.error("Failed to fetch departments");
        }

    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    }
};