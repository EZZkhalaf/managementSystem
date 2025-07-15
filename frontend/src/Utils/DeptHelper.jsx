import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export const columns = (onDepartmentDelete) => [
    {
        name : "S No" ,
        selector :(row) => row.sno
    },
    {
        name : "Department Name" ,
        selector : (row) => row.dep_name
    },
  {
    name: "Action",
    cell: (row) => (
      <DepartmentButtons _id={row._id} onDepartmentDelete={onDepartmentDelete} />
    )
  }
]

export const DepartmentButtons = ({_id , onDepartmentDelete}) =>{
    const navigate = useNavigate()

    const handleDelete = async(_id) =>{
        const response = await fetch(`http://localhost:5000/api/department/${_id}` , {
            method : "DELETE" , 
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await response.json();
        if(data.success){
            toast.success("department deleted successfully")
            onDepartmentDelete(_id)
        }
    }
    return (
        <div className="flex space-x-3">
            <button 
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
                className="px-3 py-1 bg-teal-600">
                Edit
            </button>
            <button 
                onClick={() => handleDelete(_id)}
                className="px-3 py-1 bg-red-600">
                    Delete
            </button>
        </div>
    )
}


