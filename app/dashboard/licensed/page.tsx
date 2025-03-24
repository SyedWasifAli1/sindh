import React from 'react';
import FacilityList from '@/components/FacilityList';

const Licensed = () => {
  return (
    <div>
      <FacilityList status="Licensed" />
    </div>
  );
};

export default Licensed;




// "use client";

// import React, { useState, useEffect } from 'react';

// interface Facility {
//   name: string;
//   city: string;
//   status: string;
//   date: string;
// }

// const LicensedFacilities = () => {
//   const [facilities] = useState<Facility[]>([
//     { name: "ABC Hospital", city: "Karachi", status: "Licensed", date: "2023-10-01" },
//     { name: "XYZ Clinic", city: "Hyderabad", status: "Licensed", date: "2023-09-25" },
//     { name: "PQR Diagnostic Center", city: "Sukkur", status: "Licensed", date: "2023-09-20" },
//     { name: "LMN Pharmacy", city: "Larkana", status: "Licensed", date: "2023-09-15" },
//     { name: "EFG Lab", city: "Mirpur Khas", status: "Licensed", date: "2023-09-10" },
//     { name: "RST Medical Center", city: "Karachi", status: "Licensed", date: "2023-09-05" },
//   ]);

//   const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>(facilities);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [cityFilter, setCityFilter] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const filtered = facilities.filter((facility) => {
//       const matchesCity = cityFilter ? facility.city === cityFilter : true;
//       const matchesSearch = searchQuery
//         ? facility.name.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;
//       return matchesCity && matchesSearch;
//     });
//     setFilteredFacilities(filtered);
//     setCurrentPage(1);
//   }, [cityFilter, searchQuery, facilities]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredFacilities.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   return (
//     <div className="body-wrapper-inner">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="facility-card">
//               <h5 className="card-title fw-semibold">Licensed Facilities</h5>
//               <div className="row mb-4">
//                 <div className="col-md-4">
//                   <label htmlFor="cityFilter" className="form-label">
//                     Filter by City
//                   </label>
//                   <select
//                     className="form-select"
//                     id="cityFilter"
//                     value={cityFilter}
//                     onChange={(e) => setCityFilter(e.target.value)}
//                   >
//                     <option value="">All Cities</option>
//                     <option value="Karachi">Karachi</option>
//                     <option value="Hyderabad">Hyderabad</option>
//                     <option value="Sukkur">Sukkur</option>
//                     <option value="Larkana">Larkana</option>
//                     <option value="Mirpur Khas">Mirpur Khas</option>
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label htmlFor="searchFacility" className="form-label">
//                     Search Facility
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="searchFacility"
//                     placeholder="Enter facility name"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label htmlFor="itemsPerPage" className="form-label">
//                     Items per Page
//                   </label>
//                   <select
//                     className="form-select"
//                     id="itemsPerPage"
//                     value={itemsPerPage}
//                     onChange={handleItemsPerPageChange}
//                   >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="50">50</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="table-responsive">
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Facility Name</th>
//                       <th>City</th>
//                       <th>Status</th>
//                       <th>Date</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((facility, index) => (
//                       <tr key={index}>
//                         <td>{facility.name}</td>
//                         <td>{facility.city}</td>
//                         <td>
//                           <span className={`status-badge ${facility.status.toLowerCase()}`}>
//                             {facility.status}
//                           </span>
//                         </td>
//                         <td>{facility.date}</td>
//                         <td>
//                           <button className="btn btn-sm btn-primary">Edit</button>
//                           <button className="btn btn-sm btn-danger">Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index + 1}
//                     className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-secondary"}`}
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LicensedFacilities;