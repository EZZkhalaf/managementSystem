import { calcLength } from "framer-motion";
import { toast } from "react-toastify";


export const fetchEmployeesForDepartment = async (id) => {
    try {
        console.log("the passed id : " , id)
        const response = await fetch(`http://localhost:5000/api/department/get-employees/${id}`, {
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

