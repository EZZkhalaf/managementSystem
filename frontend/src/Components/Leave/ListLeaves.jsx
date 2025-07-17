import React , {useState} from 'react'

const ListLeaves = () => {
    const [search, setSearch] = useState('');

  const leaves = [
    {
      sno: 1,
      type: 'Sick Leave',
      from: '9/1/2024',
      to: '9/5/2024',
      description: 'High fever and flu',
      appliedDate: '9/11/2024',
      status: 'Approved',
    },
    {
      sno: 2,
      type: 'Casual Leave',
      from: '9/14/2024',
      to: '9/15/2024',
      description: 'casual leave',
      appliedDate: '9/14/2024',
      status: 'Approved',
    },
  ];

  const filteredLeaves = leaves.filter(leave =>
    leave.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Leaves</h2>
          <input
            type="text"
            placeholder="Search By Status"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 sm:mt-0 sm:mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="mt-4 sm:mt-0 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">
            Add Leave
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">SNO</th>
                <th className="px-4 py-2 border-b">LEAVE TYPE</th>
                <th className="px-4 py-2 border-b">FROM</th>
                <th className="px-4 py-2 border-b">TO</th>
                <th className="px-4 py-2 border-b">DESCRIPTION</th>
                <th className="px-4 py-2 border-b">APPLIED DATE</th>
                <th className="px-4 py-2 border-b">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <tr key={leave.sno} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{leave.sno}</td>
                    <td className="px-4 py-2 border-b">{leave.type}</td>
                    <td className="px-4 py-2 border-b">{leave.from}</td>
                    <td className="px-4 py-2 border-b">{leave.to}</td>
                    <td className="px-4 py-2 border-b">{leave.description}</td>
                    <td className="px-4 py-2 border-b">{leave.appliedDate}</td>
                    <td className="px-4 py-2 border-b text-green-600 font-medium">{leave.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No leaves found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListLeaves