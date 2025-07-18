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
    selector: row => row.fromDate, // fixed
    grow: 1,
    wrap: true,
  },
  {
    name: "To",
    selector: row => row.endDate, // fixed
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
    name: "Applied ",
    selector: row => row.AppliedDate,
    width: "100px",
    center: true,
    wrap: true,
  },
  {
    name: "Status",
    selector: row => row.status,
    width: "100px",
    center: true,
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

export const fetchLeaves = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/leave/${id}`, {
            method : "GET" ,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        const resData = await response.json();
        console.log(resData)
        if (resData.success) {
            let sno = 1;
            const data = resData.leaves.map((leave) => ({
              _id: leave._id,
              sno: sno++,
              employeeId: leave.employeeId._id,
              name: leave.employeeId.userId.name,
              leaveType: leave.leaveType,
              department: leave.employeeId.department.dep_name,
              fromDate: new Date(leave.startDate).toLocaleDateString(), // Show "From" date
              endDate: new Date(leave.endDate).toLocaleDateString(),     // Show "To" date
              AppliedDate: new Date(leave.createdAt).toLocaleDateString(), // Show applied date
              days:
                (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1, // Total days inclusive
              description: leave.reason,
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