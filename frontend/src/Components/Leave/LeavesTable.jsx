// import React from 'react'

// const LeavesTable = () => {
//   return (
//     <div>
//         {/* Search + Filter Buttons */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search By Dep Name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-1/3"
//           />

//           <div className="flex space-x-2">
//             {['Pending', 'Approved', 'Rejected'].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => setFilter(status)}
//                 className={`px-4 py-2 rounded-md text-white ${
//                   filter === status
//                     ? 'bg-teal-700'
//                     : 'bg-teal-600 hover:bg-teal-700'
//                 } transition`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>
//         </div>
//     </div>
//   )
// }

// export default LeavesTable