// "use client";
// import { useState } from "react";

// const FacilitiesList = () => {
//   const [cityFilter, setCityFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [searchFacility, setSearchFacility] = useState("");

//   return (
//     <>
//             <link rel="stylesheet" href="/assets/css/styles.min.css" />
//     <div className="body-wrapper-inner">

//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-lg-12">
//           <div className="facility-card">
//             <h5 className="card-title fw-semibold">List of Facilities</h5>
//             <div className="row mb-4">
//               <div className="col-md-4">
//                 <label htmlFor="cityFilter" className="form-label">
//                   Filter by City
//                 </label>
//                 <select
//                   className="form-select"
//                   id="cityFilter"
//                   value={cityFilter}
//                   onChange={(e) => setCityFilter(e.target.value)}
//                 >
//                   <option value="">All Cities</option>
//                   <option value="Karachi">Karachi</option>
//                   <option value="Hyderabad">Hyderabad</option>
//                   <option value="Sukkur">Sukkur</option>
//                   <option value="Larkana">Larkana</option>
//                   <option value="Mirpur Khas">Mirpur Khas</option>
//                 </select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="statusFilter" className="form-label">
//                   Filter by Status
//                 </label>
//                 <select
//                   className="form-select"
//                   id="statusFilter"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="">All Statuses</option>
//                   <option value="registered">Registered</option>
//                   <option value="unregistered">Unregistered</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="searchFacility" className="form-label">
//                   Search Facility
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="searchFacility"
//                   placeholder="Enter facility name"
//                   value={searchFacility}
//                   onChange={(e) => setSearchFacility(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>Facility Name</th>
//                     <th>City</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Facility rows dynamically yahan render hongi */}

//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     </>
//   );
// };

// export default FacilitiesList;

"use client";

import React from 'react';
import FacilityCard from '@/components/FacilityCard';

const Home = () => {
  return (
    <>
            {/* <link rel="stylesheet" href="/assets/css/styles.min.css" /> */}
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <FacilityCard />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;