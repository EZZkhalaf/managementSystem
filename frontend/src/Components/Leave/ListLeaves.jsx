import React , {useEffect, useState} from 'react'
import { columns, fetchLeaves } from '../../Utils/LeavesHelper';
import DataTable from 'react-data-table-component';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/authContext';

const ListLeaves = () => {
  const {user} = useAuthContext();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [leaves , setLeaves ] = useState([]);
    const navigate = useNavigate();


  const fetchLeavesHook = async()=>{
    const data = await fetchLeaves(user.user._id);
    setLeaves(data);
  }

  useEffect(()=>{
    fetchLeavesHook();
  },[])

  
const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#333',
    },
  },
  rows: {
    style: {
      fontSize: '14px',
      minHeight: '60px', // override the row height
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
};



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">My Leaves</h2>
        </div>

        {/* Search + Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search By Dep Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-1/3"
          />

          <div className="flex space-x-2">
            
            <button
            onClick={() => navigate("/employee-dashboard/leaves/add-leave")}
            className='bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md text-white'
            >
              Request Leave
            </button>
          </div>
        </div>
        <DataTable
                columns={columns()}
                data={leaves}
                responsive
                pagination
                // customStyles={customStyles}
            />
        </div>
    </div>
  );
}

export default ListLeaves