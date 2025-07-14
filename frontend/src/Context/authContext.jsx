import { createContext, useContext, useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            
            setUser({ user: JSON.parse(storedUser), token: storedToken });
        }else{
            navigate('/login')
            toast.error("please login again")
        }

        setLoading(false); 


        
    }, []);


    const login = (userData) => {
        setUser({user : userData.user , token : userData.token});
        localStorage.setItem('user' , JSON.stringify(userData.user))
        localStorage.setItem('token' , userData.token)
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

        return (
        <UserContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </UserContext.Provider>
        );
};

export const useAuthContext = () => useContext(UserContext);