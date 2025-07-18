import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const changePassword = async(passwords , navigate) =>{
    try {
        const response = await fetch(`http://localhost:5000/api/settings/change-password`, {
                    method : "post",
                    headers: {
                        "Content-Type" : 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify({
                        userId : passwords.userId ,
                        oldPassword : passwords.oldPassword ,
                        newPassword : passwords.newPassword
                    })
                })
        
        const resData = await response.json();
        if (resData.success) {
            toast.success("password changed successfully");
            navigate("/employee-dashboard/");
        } else {
            toast.error(resData.error);
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");        
    }
}