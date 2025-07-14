import {useAuthContext} from '../Context/authContext'

const AdminDashboard = () => {
  const { user } = useAuthContext();
  console.log(user)
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      AdminDashboard<br />
      Welcome, {user.user.name}
    </div>
  );
};

export default AdminDashboard