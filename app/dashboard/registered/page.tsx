// "use client";

// import React, { useState, useEffect } from 'react';
// import { firestore } from '../../lib/firebase-config'; // Import firestore instance
// import { collection, onSnapshot } from 'firebase/firestore'; // Import Firestore methods

// interface Facility {
//   id: string; // Add ID for Firestore document
//   privateowner: string;
//   city: string;
//   status: string;
//   date: string;
// }

// const RegisteredFacilities = () => {
//   const [facilities, setFacilities] = useState<Facility[]>([]); // State for fetched facilities
//   const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]); // Filtered facilities
//   const [currentPage, setCurrentPage] = useState(1); // Pagination
//   const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page
//   const [cityFilter, setCityFilter] = useState(""); // City filter
//   const [searchQuery, setSearchQuery] = useState(""); // Search query

//   // Fetch registered facilities in real-time
//   useEffect(() => {
//     const facilitiesRef = collection(firestore, 'facility_selections'); // Replace with your collection name

//     // Listen for changes in the facilities collection
//     const unsubscribe = onSnapshot(facilitiesRef, (snapshot) => {
//       const facilitiesData = snapshot.docs.map((doc) => ({
//         id: doc.id, // Document ID
//         ...doc.data(), // Spread document data
//       })) as Facility[];

//       // Filter facilities with status "Registered"
//       const registeredFacilities = facilitiesData.filter(
//         (facility) => facility.status === "Registered"
//       );

//       setFacilities(registeredFacilities); // Update facilities state
//       setFilteredFacilities(registeredFacilities); // Initialize filtered facilities
//     });

//     // Cleanup listener on unmount
//     return () => unsubscribe();
//   }, []);

//   // Apply filters whenever cityFilter or searchQuery changes
//   useEffect(() => {
//     const filtered = facilities.filter((facility) => {
//       const matchesCity = cityFilter ? facility.city === cityFilter : true;
//       const matchesSearch = searchQuery
//         ? facility.privateowner.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;
//       return matchesCity && matchesSearch;
//     });

//     setFilteredFacilities(filtered); // Update filtered facilities
//     setCurrentPage(1); // Reset to the first page
//   }, [cityFilter, searchQuery, facilities]);

//   // Pagination logic
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
//               <h5 className="card-title fw-semibold">Registered Facilities</h5>
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
//                       <tr key={facility.id}>
//                         <td>{facility.privateowner}</td>
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

// export default RegisteredFacilities;


import React from 'react';
import FacilityList from '@/components/FacilityList';

const Registered = () => {
  return (
    <div>
      <FacilityList status="Registered" />
    </div>
  );
};

export default Registered;