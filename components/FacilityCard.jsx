// import React, { useState } from 'react';

// const FacilityCard = () => {
//   const [facilities, setFacilities] = useState([
//     { name: "ABC Hospital", city: "Karachi", status: "registered" },
//     { name: "XYZ Clinic", city: "Hyderabad", status: "unregistered" },
//     { name: "PQR Diagnostic Center", city: "Sukkur", status: "rejected" },
//     { name: "LMN Pharmacy", city: "Larkana", status: "registered" },
//     { name: "EFG Lab", city: "Mirpur Khas", status: "unregistered" },
//     { name: "RST Medical Center", city: "Karachi", status: "registered" },
//   ]);

//   const questions = [
//     { question: "What is the facility's primary service?", answer: "General healthcare services." },
//     { question: "How many staff members are employed?", answer: "25 staff members." },
//     { question: "Is the facility operational 24/7?", answer: "Yes, the facility operates 24/7." },
//     { question: "What types of medical equipment are available?", answer: "X-ray machines, ultrasound, and lab equipment." },
//     { question: "Does the facility have an emergency department?", answer: "Yes, it has a fully equipped emergency department." },
//     // Add more questions as needed
//   ];

//   const [filteredFacilities, setFilteredFacilities] = useState(facilities);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility

//   const filterFacilities = () => {
//     const cityFilter = document.getElementById("cityFilter").value.toLowerCase();
//     const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
//     const searchQuery = document.getElementById("searchFacility").value.toLowerCase();

//     const filtered = facilities.filter(facility => {
//       const matchesCity = cityFilter ? facility.city.toLowerCase() === cityFilter : true;
//       const matchesStatus = statusFilter ? facility.status === statusFilter : true;
//       const matchesSearch = searchQuery ? facility.name.toLowerCase().includes(searchQuery) : true;

//       return matchesCity && matchesStatus && matchesSearch;
//     });

//     setFilteredFacilities(filtered);
//   };

//   const updateFacilityStatus = (facilityName, newStatus) => {
//     const updatedFacilities = facilities.map(facility => {
//       if (facility.name === facilityName) {
//         return { ...facility, status: newStatus };
//       }
//       return facility;
//     });
//     setFacilities(updatedFacilities);
//     filterFacilities();
//   };

//   const handleShowModal = () => {
//     setShowModal(true); // Open the modal
//   };

//   const handleCloseModal = () => {
//     setShowModal(false); // Close the modal
//   };

//   return (
//     <>
    
    
//     <div className="facility-card">
//       <h5 className="card-title fw-semibold">List of Facilities</h5>
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <label htmlFor="cityFilter" className="form-label">Filter by City</label>
//           <select className="form-select" id="cityFilter" onChange={filterFacilities}>
//             <option value="">All Cities</option>
//             <option value="Karachi">Karachi</option>
//             <option value="Hyderabad">Hyderabad</option>
//             <option value="Sukkur">Sukkur</option>
//             <option value="Larkana">Larkana</option>
//             <option value="Mirpur Khas">Mirpur Khas</option>
//           </select>
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
//           <select className="form-select" id="statusFilter" onChange={filterFacilities}>
//             <option value="">All Statuses</option>
//             <option value="registered">Registered</option>
//             <option value="unregistered">Unregistered</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="searchFacility" className="form-label">Search Facility</label>
//           <input type="text" className="form-control" id="searchFacility" placeholder="Enter facility name" onChange={filterFacilities} />
//         </div>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Facility Name</th>
//               <th>City</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody id="facilityTable">
//             {filteredFacilities.map((facility, index) => (
//               <tr key={index}>
//                 <td>{facility.name}</td>
//                 <td>{facility.city}</td>
//                 <td>
//                   <select className="form-select status-select" value={facility.status} onChange={(e) => updateFacilityStatus(facility.name, e.target.value)}>
//                     <option value="registered">Registered</option>
//                     <option value="unregistered">Unregistered</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button className="btn btn-sm btn-primary">Edit</button>
//                   <button className="btn btn-sm btn-danger">Delete</button>
//                   <button className="btn btn-sm btn-info" onClick={handleShowModal}>Show Questioning</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Facility Questioning</h5>
//                 <button type="button" className="btn-close" onClick={handleCloseModal}></button>
//               </div>
//               <div className="modal-body">
//                 <div id="questioningContent">
//                   {questions.map((q, index) => (
//                     <div className="question-item" key={index}>
//                       <strong>Q{index + 1}: {q.question}</strong>
//                       <p>A: {q.answer}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default FacilityCard;

import React, { useState, useEffect } from 'react';
import { firestore, collection, doc, updateDoc, onSnapshot } from '../app/lib/firebase-config';

const FacilityCard = () => {
  const [city, setCity] = useState([]); // Combined facilities data
  const [facilities, setFacilities] = useState([]); // Combined facilities data
  const [filteredFacilities, setFilteredFacilities] = useState([]); // Filtered facilities
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Details modal control
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedFacility, setSelectedFacility] = useState(null); // Track selected facility for details

  // Real-time data fetching using onSnapshot
  useEffect(() => {
    const facilitiesRef = collection(firestore, 'facility_selections');
  
    // Listen for changes in facility_selections
    const unsubscribeFacilities = onSnapshot(facilitiesRef, (facilitiesSnapshot) => {
      const facilitiesData = facilitiesSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      })) ;
  
      // Extract unique cities from facilitiesData
      const uniqueCities = Array.from(
        new Set(facilitiesData.map((facility) => facility.cityName))
      ).map((city) => ({ id: city, city })); // Create an array of unique cities
  
      // Set facilities and unique cities
      setFacilities(facilitiesData);
      setCity(uniqueCities); // Set unique cities
      setFilteredFacilities(facilitiesData); // Initialize filtered facilities
      setLoading(false);
    });
  
    // Cleanup facility listener
    return () => unsubscribeFacilities();
  }, []);

  const filterFacilities = () => {
    const cityFilter = document.getElementById("cityFilter").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
    const searchQuery = document.getElementById("searchFacility").value.toLowerCase();
  
    const filtered = facilities.filter(facility => {
      // Safeguard against undefined fields
      const facilityCity = facility.cityName ? facility.cityName.toLowerCase() : '';
      const facilityStatus = facility.status ? facility.status.toLowerCase() : '';
      const facilityOwner = facility.privateOwner ? facility.privateOwner.toLowerCase() : '';
      const facilityClinicName = facility.clinicName ? facility.clinicName.toLowerCase() : '';
  
      const matchesCity = cityFilter ? facilityCity === cityFilter : true;
      const matchesStatus = statusFilter ? facilityStatus === statusFilter : true;
      const matchesSearch = searchQuery ? 
        facilityOwner.includes(searchQuery) || 
        facilityClinicName.includes(searchQuery) : true;
  
      return matchesCity && matchesStatus && matchesSearch;
    });
  
    setFilteredFacilities(filtered);
  };

  const updateFacilityStatus = async (facilityId, newStatus) => {
    try {
      // Update status in Firestore
      const facilityRef = doc(firestore, 'facility_selections', facilityId);
      await updateDoc(facilityRef, { status: newStatus });

      // No need to update local state manually; onSnapshot will handle it
    } catch (error) {
      console.error("Error updating facility status: ", error);
    }
  };

  const handleShowDetailsModal = (facility) => {
    setSelectedFacility(facility); // Set the selected facility
    setShowDetailsModal(true); // Open details modal
  };

  const handleCloseModals = () => {
    setShowDetailsModal(false); // Close details modal
    setSelectedFacility(null); // Reset selected facility
  };

  if (loading) {
    return <div>Loading facilities...</div>; // Loading state
  }

  return (
    <>
      <div className="facility-card">
        <h5 className="card-title fw-semibold">List of Facilities</h5>
        <div className="row mb-4">
          <div className="col-md-4">
            <label htmlFor="cityFilter" className="form-label">Filter by City</label>
            <select className="form-select" id="cityFilter" onChange={filterFacilities}>
              <option value="">All Cities</option>
              {Array.from(new Set(city.map((city) => city.city)))
                .map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
            <select className="form-select" id="statusFilter" onChange={filterFacilities}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
                      <option value="Registered">Registered</option>
                      <option value="UnRegistered">UnRegistered</option>
                      <option value="Licensed">Licensed</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="searchFacility" className="form-label">Search Facility</label>
            <input type="text" className="form-control" id="searchFacility" placeholder="Enter facility name" onChange={filterFacilities} />
        
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Facility Type</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="facilityTable">
              {filteredFacilities.map((facility, index) => (
                <tr key={index}>
                  <td>{facility.privateOwner}</td>
                  <td>{facility.clinictype}</td>
                  <td>{facility.cityName}</td>
                  <td>
                    <select
                      className="form-select status-select"
                      value={facility.status}
                      onChange={(e) => updateFacilityStatus(facility.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Registered">Registered</option>
                      <option value="UnRegistered">UnRegistered</option>
                      <option value="Licensed">Licensed</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                    <button className="btn btn-sm btn-info" onClick={() => handleShowDetailsModal(facility)}>Show Questing</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Modal */}
        {showDetailsModal && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Facility Details - {selectedFacility?.privateowner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div id="detailsContent">
                    {selectedFacility && (
                      <div>
                        {/* General Facility Details */}
                        <p><strong>Q1: What services are you providing at this facility?</strong><br /> * {selectedFacility.clinicname}</p>
                        <p><strong>Q2: SHCC Assigned Category?</strong> <br /> * {selectedFacility.clinictype}</p>
                        <p><strong>Q3: Who owns the facility?</strong> <br /> * {selectedFacility.ownership} <br /> * {selectedFacility.privateowner}</p>
                        <p><strong>Q4: Who manages the Facility?</strong><br /> * {selectedFacility.managername} <br /> * {selectedFacility.managerdesignation} <br /> * {selectedFacility.managementtype}</p>
                        <p><strong>Q5: What is the service level category?</strong> <br /> * {selectedFacility.servicelevel}</p>
                        <p>
                          <strong>Q6: What is the operational level category?</strong> <br />
                          {[
                            selectedFacility.outpatient ? "Out Patient" : null,
                            selectedFacility.ambulatorycare ? "Ambulatory Care" : null,
                            selectedFacility.inpatient ? "In-Patient" : null,
                            selectedFacility.ehabilitation ? "Rehabilitation" : null,
                            selectedFacility.diagnostics ? "Diagnostics" : null,
                            selectedFacility.alloftheabove ? "All of the above" : null,
                          ]
                            .filter(Boolean) // Remove null/empty values
                            .join(", ")} {/* Join non-empty values with a comma */}
                        </p>

                        {/* Table for Inpatient and Ambulatory Beds */}
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Beds</th>
                                <th>Inpatient {selectedFacility.inpatient ? "(Yes)" : "(No)"}</th>
                                <th>Ambulatory {selectedFacility.ambulatorycare ? "(Yes)" : "(No)"}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>ER Beds</td>
                                <td>{selectedFacility.inPatienterBeds}</td>
                                <td>{selectedFacility.ambulatoryerBeds}</td>
                              </tr>
                              <tr>
                                <td>Holding Beds</td>
                                <td>{selectedFacility.inPatientholdingBeds}</td>
                                <td>{selectedFacility.ambulatoryholdingBeds}</td>
                              </tr>
                              <tr>
                                <td>ICU Beds</td>
                                <td>{selectedFacility.inPatienticuBeds}</td>
                                <td>{selectedFacility.ambulatoryicuBeds}</td>
                              </tr>
                              <tr>
                                <td>NICU Beds</td>
                                <td>{selectedFacility.inPatientnicuBeds}</td>
                                <td>{selectedFacility.ambulatorynicuBeds}</td>
                              </tr>
                              <tr>
                                <td>PICU Beds</td>
                                <td>{selectedFacility.inPatientpicuBeds}</td>
                                <td>{selectedFacility.ambulatorypicuBeds}</td>
                              </tr>
                              <tr>
                                <td>Private Beds</td>
                                <td>{selectedFacility.inPatientprivateBeds}</td>
                                <td>{selectedFacility.ambulatoryprivateBeds}</td>
                              </tr>
                              <tr>
                                <td>Semi-General Beds</td>
                                <td>{selectedFacility.inPatientsemiGeneralBeds}</td>
                                <td>{selectedFacility.ambulatorysemiGeneralBeds}</td>
                              </tr>
                              <tr>
                                <td>Specialized Care Beds</td>
                                <td>{selectedFacility.inPatientspecializedCareBeds}</td>
                                <td>{selectedFacility.ambulatoryspecializedCareBeds}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FacilityCard;