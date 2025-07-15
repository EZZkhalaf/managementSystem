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