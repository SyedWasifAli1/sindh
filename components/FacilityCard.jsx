// import React, { useState, useEffect } from 'react';
// import { firestore, collection, doc, updateDoc, onSnapshot } from '../app/lib/firebase-config';

// const FacilityCard = () => {
//   const [city, setCity] = useState([]); // Combined facilities data
//   const [facilities, setFacilities] = useState([]); // Combined facilities data
//   const [filteredFacilities, setFilteredFacilities] = useState([]); // Filtered facilities
//   const [showDetailsModal, setShowDetailsModal] = useState(false); // Details modal control
//   const [loading, setLoading] = useState(true); // Loading state
//   const [selectedFacility, setSelectedFacility] = useState(null); // Track selected facility for details

//   // Real-time data fetching using onSnapshot
//   useEffect(() => {
//     const facilitiesRef = collection(firestore, 'facility_selections');
  
//     // Listen for changes in facility_selections
//     const unsubscribeFacilities = onSnapshot(facilitiesRef, (facilitiesSnapshot) => {
//       const facilitiesData = facilitiesSnapshot.docs.map((doc) => ({
//         id: doc.id, // Document ID
//         ...doc.data(), // Document data
//       })) ;
  
//       // Extract unique cities from facilitiesData
//       const uniqueCities = Array.from(
//         new Set(facilitiesData.map((facility) => facility.cityName))
//       ).map((city) => ({ id: city, city })); // Create an array of unique cities
  
//       // Set facilities and unique cities
//       setFacilities(facilitiesData);
//       setCity(uniqueCities); // Set unique cities
//       setFilteredFacilities(facilitiesData); // Initialize filtered facilities
//       setLoading(false);
//     });
  
//     // Cleanup facility listener
//     return () => unsubscribeFacilities();
//   }, []);

//   const filterFacilities = () => {
//     const cityFilter = document.getElementById("cityFilter").value.toLowerCase();
//     const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
//     const searchQuery = document.getElementById("searchFacility").value.toLowerCase();
  
//     const filtered = facilities.filter(facility => {
//       // Safeguard against undefined fields
//       const facilityCity = facility.cityName ? facility.cityName.toLowerCase() : '';
//       const facilityStatus = facility.status ? facility.status.toLowerCase() : '';
//       const facilityOwner = facility.privateOwner ? facility.privateOwner.toLowerCase() : '';
//       const facilityClinicName = facility.clinicName ? facility.clinicName.toLowerCase() : '';
  
//       const matchesCity = cityFilter ? facilityCity === cityFilter : true;
//       const matchesStatus = statusFilter ? facilityStatus === statusFilter : true;
//       const matchesSearch = searchQuery ? 
//         facilityOwner.includes(searchQuery) || 
//         facilityClinicName.includes(searchQuery) : true;
  
//       return matchesCity && matchesStatus && matchesSearch;
//     });
  
//     setFilteredFacilities(filtered);
//   };

//   const updateFacilityStatus = async (facilityId, newStatus) => {
//     try {
//       // Update status in Firestore
//       const facilityRef = doc(firestore, 'facility_selections', facilityId);
//       await updateDoc(facilityRef, { status: newStatus });

//       // No need to update local state manually; onSnapshot will handle it
//     } catch (error) {
//       console.error("Error updating facility status: ", error);
//     }
//   };

//   const handleShowDetailsModal = (facility) => {
//     setSelectedFacility(facility); // Set the selected facility
//     setShowDetailsModal(true); // Open details modal
//   };

//   const handleCloseModals = () => {
//     setShowDetailsModal(false); // Close details modal
//     setSelectedFacility(null); // Reset selected facility
//   };

//   if (loading) {
//     return <div>Loading facilities...</div>; // Loading state
//   }

//   return (
//     <>
//       <div className="facility-card">
//         <h5 className="card-title fw-semibold">List of Facilities</h5>
//         <div className="row mb-4">
//           <div className="col-md-4">
//             <label htmlFor="cityFilter" className="form-label">Filter by City</label>
//             <select className="form-select" id="cityFilter" onChange={filterFacilities}>
//               <option value="">All Cities</option>
//               {Array.from(new Set(city.map((city) => city.city)))
//                 .map((city, index) => (
//                   <option key={index} value={city}>
//                     {city}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="col-md-4">
//             <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
//             <select className="form-select" id="statusFilter" onChange={filterFacilities}>
//               <option value="">All Statuses</option>
//               <option value="Pending">Pending</option>
//                       <option value="Registered">Registered</option>
//                       <option value="Un-Registered">Un-Registered</option>
//                       <option value="Licensed">Licensed</option>
//             </select>
//           </div>
//           <div className="col-md-4">
//             <label htmlFor="searchFacility" className="form-label">Search Facility</label>
//             <input type="text" className="form-control" id="searchFacility" placeholder="Enter facility name" onChange={filterFacilities} />
        
//           </div>
//         </div>
//         <div className="table-responsive">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Facility Name</th>
//                 <th>Facility Type</th>
//                 <th>City</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody id="facilityTable">
//               {filteredFacilities.map((facility, index) => (
//                 <tr key={index}>
//                   <td>{facility.privateOwner}</td>
//                   <td>{facility.clinictype}</td>
//                   <td>{facility.cityName}</td>
//                   <td>
//                     <select
//                       className="form-select status-select"
//                       value={facility.status}
//                       onChange={(e) => updateFacilityStatus(facility.id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Registered">Registered</option>
//                       <option value="Un-Registered">Un-Registered</option>
//                       <option value="Licensed">Licensed</option>
//                     </select>
//                   </td>
//                   <td>
//                     <button className="btn btn-sm btn-primary">Edit</button>
//                     <button className="btn btn-sm btn-danger">Delete</button>
//                     <button className="btn btn-sm btn-info" onClick={() => handleShowDetailsModal(facility)}>Show Questing</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Details Modal */}
//         {showDetailsModal && (
//           <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Facility Details - {selectedFacility?.privateowner}</h5>
//                   <button type="button" className="btn-close" onClick={handleCloseModals}></button>
//                 </div>
//                 <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//                   <div id="detailsContent">
//                     {selectedFacility && (
//                       <div>
//                         {/* General Facility Details */}
//                         <p><strong>Q1: What services are you providing at this facility?</strong><br /> * {selectedFacility.clinicname}</p>
//                         <p><strong>Q2: SHCC Assigned Category?</strong> <br /> * {selectedFacility.clinictype}</p>
//                         <p><strong>Q3: Who owns the facility?</strong> <br /> * {selectedFacility.ownership} <br /> * {selectedFacility.privateowner}</p>
//                         <p><strong>Q4: Who manages the Facility?</strong><br /> * {selectedFacility.managername} <br /> * {selectedFacility.managerdesignation} <br /> * {selectedFacility.managementtype}</p>
//                         <p><strong>Q5: What is the service level category?</strong> <br /> * {selectedFacility.servicelevel}</p>
//                         <p>
//                           <strong>Q6: What is the operational level category?</strong> <br />
//                           {[
//                             selectedFacility.outpatient ? "Out Patient" : null,
//                             selectedFacility.ambulatorycare ? "Ambulatory Care" : null,
//                             selectedFacility.inpatient ? "In-Patient" : null,
//                             selectedFacility.ehabilitation ? "Rehabilitation" : null,
//                             selectedFacility.diagnostics ? "Diagnostics" : null,
//                             selectedFacility.alloftheabove ? "All of the above" : null,
//                           ]
//                             .filter(Boolean) // Remove null/empty values
//                             .join(", ")} {/* Join non-empty values with a comma */}
//                         </p>

//                         {/* Table for Inpatient and Ambulatory Beds */}
//                         <div className="table-responsive">
//                           <table className="table table-bordered table-striped">
//                             <thead>
//                               <tr>
//                                 <th>Beds</th>
//                                 <th>Inpatient {selectedFacility.inpatient ? "(Yes)" : "(No)"}</th>
//                                 <th>Ambulatory {selectedFacility.ambulatorycare ? "(Yes)" : "(No)"}</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               <tr>
//                                 <td>ER Beds</td>
//                                 <td>{selectedFacility.inPatienterBeds}</td>
//                                 <td>{selectedFacility.ambulatoryerBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>Holding Beds</td>
//                                 <td>{selectedFacility.inPatientholdingBeds}</td>
//                                 <td>{selectedFacility.ambulatoryholdingBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>ICU Beds</td>
//                                 <td>{selectedFacility.inPatienticuBeds}</td>
//                                 <td>{selectedFacility.ambulatoryicuBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>NICU Beds</td>
//                                 <td>{selectedFacility.inPatientnicuBeds}</td>
//                                 <td>{selectedFacility.ambulatorynicuBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>PICU Beds</td>
//                                 <td>{selectedFacility.inPatientpicuBeds}</td>
//                                 <td>{selectedFacility.ambulatorypicuBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>Private Beds</td>
//                                 <td>{selectedFacility.inPatientprivateBeds}</td>
//                                 <td>{selectedFacility.ambulatoryprivateBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>Semi-General Beds</td>
//                                 <td>{selectedFacility.inPatientsemiGeneralBeds}</td>
//                                 <td>{selectedFacility.ambulatorysemiGeneralBeds}</td>
//                               </tr>
//                               <tr>
//                                 <td>Specialized Care Beds</td>
//                                 <td>{selectedFacility.inPatientspecializedCareBeds}</td>
//                                 <td>{selectedFacility.ambulatoryspecializedCareBeds}</td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Close</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default FacilityCard;



import React, { useState, useEffect } from 'react';
import { firestore, collection, doc, updateDoc, onSnapshot, deleteDoc } from '../app/lib/firebase-config';
const FacilityCard = () => {
  const [city, setCity] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showHomeopathyModal, setShowHomeopathyModal] = useState(false);
const [showTibbMatabModal, setShowTibbMatabModal] = useState(false);
const [showGPModal, setShowGPModal] = useState(false);
const [showPolyModal, setShowPolyModal] = useState(false);
const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
const [showDentalModal, setShowDentalModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [licenseData, setLicenseData] = useState({
    licenseName: '',
    licenseImage: null
  });
  const [newStatus, setNewStatus] = useState(''); // Track the new status for confirmation

  useEffect(() => {
    const facilitiesRef = collection(firestore, 'facility_selections');
  
    const unsubscribeFacilities = onSnapshot(facilitiesRef, (facilitiesSnapshot) => {
      const facilitiesData = facilitiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const allowedStatuses = ["Licensed", "Registered", "Un-Registered", "Pending"];
      const filteredFacilities = facilitiesData.filter((facility) => 
        allowedStatuses.includes(facility.status)
      );

      const uniqueCities = Array.from(
        new Set(filteredFacilities.map((facility) => facility.cityName))
      ).map((city) => ({ id: city, city }));
  
      setFacilities(filteredFacilities);
      setCity(uniqueCities);
      setFilteredFacilities(filteredFacilities);
      setLoading(false);
    });
  
    return () => unsubscribeFacilities();
  }, []);

  const filterFacilities = () => {
    const cityFilter = document.getElementById("cityFilter").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
    const searchQuery = document.getElementById("searchFacility").value.toLowerCase();
  
    const filtered = facilities.filter(facility => {
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

  const handleStatusChange = (facilityId, currentStatus, newStatus) => {
    const facility = facilities.find(f => f.id === facilityId);
    setSelectedFacility(facility);
    setNewStatus(newStatus);
    
    // Prevent any changes if current status is Pending
    // if (currentStatus === 'Pending') {
    //   alert("Pending facilities cannot be modified");
    //   return;
    // }
    
    // Prevent changing to Pending status
    if (newStatus === 'Pending') {
      alert("Cannot change status back to Pending");
      return;
    }
  
    if (newStatus === 'Licensed') {
      // Show license modal
      setShowLicenseModal(true);
    } else if (currentStatus === 'Registered' || currentStatus === 'Un-Registered' || currentStatus === 'Pending') {
      // Show confirmation modal for Registered/Un-Registered changes
      setShowConfirmModal(true);
    } else {
      // Direct update for other cases
      updateFacilityStatus(facilityId, newStatus);
    }
  };

  const updateFacilityStatus = async (facilityId, status, licenseData = null) => {
    try {
      if (!status) {
        console.error("Status is required");
        return;
      }

      const updateData = { status };
      
      if (status === 'Licensed' && licenseData) {
        updateData.licenseName = licenseData.licenseName;
        updateData.licenseImage = licenseData.licenseImage;
      }
      
      const facilityRef = doc(firestore, 'facility_selections', facilityId);
      await updateDoc(facilityRef, updateData);
      
      // Reset modals and license data
      setShowConfirmModal(false);
      setShowLicenseModal(false);
      setLicenseData({
        licenseName: '',
        licenseImage: null
      });
    } catch (error) {
      console.error("Error updating facility status: ", error);
    }
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert image to base64 string for storage
        setLicenseData({
          ...licenseData,
          licenseImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleShowDetailsModal = (facility) => {
  //   setSelectedFacility(facility);
  //   setShowDetailsModal(true);
  // };
  const handleDeleteFacility = async (facilityId) => {
    if (!window.confirm('Are you sure you want to delete this facility?')) {
      return;
    }
    
    try {
      const facilityToDelete = facilities.find(f => f.id === facilityId);
      
      if (facilityToDelete) {
        await deleteDoc(doc(firestore, "facility_selections", facilityId));
        setFacilities(facilities.filter(f => f.id !== facilityId));
        alert('Facility successfully deleted');
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
      alert(`Error deleting facility: ${error.message}`);
    }
  };

  const handleShowDetailsModal = (facility) => {
    setSelectedFacility(facility);
    
    // Check facility type and open appropriate modal
    switch(facility.clinictype) {
      case "Homeopathy Clinic":
        setShowHomeopathyModal(true);
        break;
      case "TibbMatab Clinic":
        setShowTibbMatabModal(true);
        break;
      case "GP Clinic":
        setShowGPModal(true);
        break;
      case "Poly Clinic":
        setShowPolyModal(true);
        break;
      case "Consultant / Single Specialty Clinic":
        setShowSpecialtyModal(true);
        break;
      case "Dental Clinic":
        setShowDentalModal(true);
        break;
      default:
        setShowDefaultModal(true); // Fallback for unknown types
    }
  };

  const handleCloseModals = () => {
    setShowTibbMatabModal(false);
    setShowHomeopathyModal(false);
    setShowGPModal(false);
    setShowPolyModal(false);
    setShowSpecialtyModal(false);
    setShowDentalModal(false);
    setShowDetailsModal(false);
    setShowConfirmModal(false);
    setShowLicenseModal(false);
    setSelectedFacility(null);
    setLicenseData({
      licenseName: '',
      licenseImage: null
    });
  };

  if (loading) {
    return <div>Loading facilities...</div>;
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
              {/* <option value="Pending">Pending</option> */}
              <option value="Registered">Registered</option>
              <option value="Un-Registered">Un-Registered</option>
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
  onChange={(e) => {
    handleStatusChange(facility.id, facility.status, e.target.value);
    // Reset the select value if the change wasn't allowed
    if (facility.status === 'Pending' || e.target.value === 'Pending') {
      e.target.value = facility.status;
    }
  }}
  data-facility-id={facility.id}
>
  <option value="Pending">Pending</option>
  <option value="Registered">Registered</option>
  <option value="Un-Registered">Un-Registered</option>
  <option value="Licensed">Licensed</option>
</select>
                  </td>
                  <td>
  <div style={{ display: "flex", gap: "8px" }}>
    <button
      className="btn btn-sm"
      style={{
        backgroundColor: "rgb(24, 80, 16)",
        color: "white",
      }}
    >
      Edit
    </button>
    {/* <button
      className="btn btn-sm"
      style={{
        backgroundColor: "rgb(182, 19, 25)",
        color: "white",
      }}
    >
      Delete
    </button>
     */}

<button
  className="btn btn-sm"
  style={{
    backgroundColor: "rgb(182, 19, 25)",
    color: "white",
  }}
  onClick={() => handleDeleteFacility(facility.id)}
>
  Delete
</button>
    <button
  className="btn btn-sm"
  onClick={() => handleShowDetailsModal(facility)}
  style={{
    backgroundColor: '#696969',
    // borderColor: '#696969',
    color: 'white' // White text for better contrast
  }}
>
  Show Details
</button>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Modal */}
        {showTibbMatabModal  && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Facility Details - {selectedFacility?.privateOwner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div id="detailsContent">
                  {selectedFacility && (
  <div>
    {selectedFacility.clinicName && 
      <p><strong>Q1: What services are you providing at this facility?</strong><br /> Ans: {selectedFacility.clinicName}</p>
    }
    
    {selectedFacility.clinictype && 
      <p><strong>Q2: SHCC Assigned Category?</strong><br /> Ans: {selectedFacility.clinictype}</p>
    }
    
    {(selectedFacility.ownership || selectedFacility.privateOwner) && 
      <p><strong>Q3: Who owns the facility?</strong><br />
        OwnerShip Type: {selectedFacility.ownership || ''}
        {selectedFacility.privateOwner && <><br /> OwnerName: {selectedFacility.privateOwner}</>}
      </p>
    }
    
    {(selectedFacility.managerName || selectedFacility.managerDesignation || selectedFacility.managementType) && 
      <p><strong>Q4: Who manages the Facility?</strong><br />
        Name: {selectedFacility.managerName || ''}
        {selectedFacility.managerDesignation && <><br />Designation: {selectedFacility.managerDesignation}</>}
        {selectedFacility.managementType && <><br />Management: {selectedFacility.managementType}</>}
      </p>
    }
    
    {selectedFacility.serviceLevel && 
      <p><strong>Q5: What is the service level category?</strong><br /> Ans: {selectedFacility.serviceLevel}</p>
    }
    
    <p>
      <strong>Q6: What is the operational level category?</strong><br />
      Ans: {[
        selectedFacility.isOutPatient ? "Out Patient" : null,
        selectedFacility.isAmbulatoryCare ? "Ambulatory Care" : null,
        selectedFacility.isInPatient ? "In-Patient" : null,
        selectedFacility.isRehabilitation ? "Rehabilitation" : null,
        selectedFacility.isDiagnostics ? "Diagnostics" : null,
        selectedFacility.isAllOfAbove ? "All of the above" : null,
      ]
      .filter(Boolean)
      .join(" + ")}
    </p>

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
          {[
            { name: "ER Beds", inpatient: selectedFacility.inPatienterBeds, ambulatory: selectedFacility.ambulatoryerBeds },
            { name: "Holding Beds", inpatient: selectedFacility.inPatientholdingBeds, ambulatory: selectedFacility.ambulatoryholdingBeds },
            { name: "ICU Beds", inpatient: selectedFacility.inPatienticuBeds, ambulatory: selectedFacility.ambulatoryicuBeds },
            { name: "NICU Beds", inpatient: selectedFacility.inPatientnicuBeds, ambulatory: selectedFacility.ambulatorynicuBeds },
            { name: "PICU Beds", inpatient: selectedFacility.inPatientpicuBeds, ambulatory: selectedFacility.ambulatorypicuBeds },
            { name: "Private Beds", inpatient: selectedFacility.inPatientprivateBeds, ambulatory: selectedFacility.ambulatoryprivateBeds },
            { name: "Semi-General Beds", inpatient: selectedFacility.inPatientsemiGeneralBeds, ambulatory: selectedFacility.ambulatorysemiGeneralBeds },
            { name: "Specialized Care Beds", inpatient: selectedFacility.inPatientspecializedCareBeds, ambulatory: selectedFacility.ambulatoryspecializedCareBeds }
          ].map((bed, index) => (
            <tr key={index}>
              <td>{bed.name}</td>
              <td>{bed.inpatient || '-'}</td>
              <td>{bed.ambulatory || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn  " style={{backgroundColor:'#b61319' ,color:'white'}} onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showHomeopathyModal   && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title"> showHomeopathy Facility Details - {selectedFacility?.privateOwner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  { <div id="detailsContent">
                  {selectedFacility && (
  <div>
    {selectedFacility.clinicName && 
  <p>
    <strong>Q1: What services are you providing at this facility?</strong><br />
    Ans:  {selectedFacility.clinicName}
    {/* {[
      selectedFacility.isHomeopathyOPD && "Homeopathy OPD",
      selectedFacility.isDispensingHomeopathyMedicine && "Dispensing Homeopathy Medicine"
    ]
    .filter(Boolean)
    .join(", ")} */}
  </p>
}
    {selectedFacility.clinictype && 
      <p><strong>Q2: SHCC Assigned Category?</strong><br /> Ans: {selectedFacility.clinictype}</p>
    }
    
    {(selectedFacility.ownership || selectedFacility.privateOwner) && 
      <p><strong>Q3: Who owns the facility?</strong><br />
        OwnerShip Type: {selectedFacility.ownership || ''}
        {selectedFacility.privateOwner && <><br /> Owner Name: {selectedFacility.privateOwner}</>}
      </p>
    }
    
    {(selectedFacility.managerName || selectedFacility.managerDesignation || selectedFacility.managementType) && 
      <p><strong>Q4: Who manages the Facility?</strong><br />
        Name: {selectedFacility.managerName || ''}
        {selectedFacility.managerDesignation && <><br />Designation: {selectedFacility.managerDesignation}</>}
        {selectedFacility.managementType && <><br />Management: {selectedFacility.managementType}</>}
      </p>
    }
    
    {selectedFacility.serviceLevel && 
      <p><strong>Q5: What is the service level category?</strong><br /> Ans: {selectedFacility.serviceLevel}</p>
    }
    
    <p>
      <strong>Q6: What is the operational level category?</strong><br />
      Ans: {[
        selectedFacility.isOutPatient ? "Out Patient" : null,
        selectedFacility.isAmbulatoryCare ? "Ambulatory Care" : null,
        selectedFacility.isInPatient ? "In-Patient" : null,
        selectedFacility.isRehabilitation ? "Rehabilitation" : null,
        selectedFacility.isDiagnostics ? "Diagnostics" : null,
        selectedFacility.isAllOfAbove ? "All of the above" : null,
      ]
      .filter(Boolean)
      .join(" + ")}
    </p>

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
          {[
            { name: "ER Beds", inpatient: selectedFacility.inPatienterBeds, ambulatory: selectedFacility.ambulatoryerBeds },
            { name: "Holding Beds", inpatient: selectedFacility.inPatientholdingBeds, ambulatory: selectedFacility.ambulatoryholdingBeds },
            { name: "ICU Beds", inpatient: selectedFacility.inPatienticuBeds, ambulatory: selectedFacility.ambulatoryicuBeds },
            { name: "NICU Beds", inpatient: selectedFacility.inPatientnicuBeds, ambulatory: selectedFacility.ambulatorynicuBeds },
            { name: "PICU Beds", inpatient: selectedFacility.inPatientpicuBeds, ambulatory: selectedFacility.ambulatorypicuBeds },
            { name: "Private Beds", inpatient: selectedFacility.inPatientprivateBeds, ambulatory: selectedFacility.ambulatoryprivateBeds },
            { name: "Semi-General Beds", inpatient: selectedFacility.inPatientsemiGeneralBeds, ambulatory: selectedFacility.ambulatorysemiGeneralBeds },
            { name: "Specialized Care Beds", inpatient: selectedFacility.inPatientspecializedCareBeds, ambulatory: selectedFacility.ambulatoryspecializedCareBeds }
          ].map((bed, index) => (
            <tr key={index}>
              <td>{bed.name}</td>
              <td>{bed.inpatient || '-'}</td>
              <td>{bed.ambulatory || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
                  </div> }
                </div>
                <div className="modal-footer">
                <button type="button" className="btn  " style={{backgroundColor:'#b61319' ,color:'white'}} onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showGPModal   && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title"> GP Clinic Facility Details - {selectedFacility?.privateOwner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  { <div id="detailsContent">
                  {selectedFacility && (
  <div>
    {selectedFacility.clinicName && 
  <p>
    <strong>Q1: What services are you providing at this facility?</strong><br />
    Ans: {selectedFacility.clinicName}
    {/* {[
      selectedFacility.isHomeopathyOPD && "Homeopathy OPD",
      selectedFacility.isDispensingHomeopathyMedicine && "Dispensing Homeopathy Medicine"
    ]
    .filter(Boolean)
    .join(", ")} */}
  </p>
}
    {selectedFacility.clinictype && 
      <p><strong>Q2: SHCC Assigned Category?</strong><br /> Ans: {selectedFacility.clinictype}</p>
    }
    
    {(selectedFacility.ownership || selectedFacility.privateOwner) && 
      <p><strong>Q3: Who owns the facility?</strong><br />
        OwnerShip Type: {selectedFacility.ownership || ''}
        {selectedFacility.privateOwner && <><br /> Owner Name:{selectedFacility.privateOwner}</>}
      </p>
    }
    
    {(selectedFacility.managerName || selectedFacility.managerDesignation || selectedFacility.managementType) && 
      <p><strong>Q4: Who manages the Facility?</strong><br />
        Ans: {selectedFacility.managerName || ''}
        {selectedFacility.managerDesignation && <><br /> {selectedFacility.managerDesignation}</>}
        {selectedFacility.managementType && <><br /> {selectedFacility.managementType}</>}
      </p>
    }
    
    {selectedFacility.serviceLevel && 
      <p><strong>Q5: What is the service level category?</strong><br /> Ans: {selectedFacility.serviceLevel}</p>
    }
    
    <p>
      <strong>Q6: What is the operational level category?</strong><br />
      Ans: {[
        selectedFacility.isOutPatient ? "Out Patient" : null,
        selectedFacility.isAmbulatoryCare ? "Ambulatory Care" : null,
        selectedFacility.isInPatient ? "In-Patient" : null,
        selectedFacility.isRehabilitation ? "Rehabilitation" : null,
        selectedFacility.isDiagnostics ? "Diagnostics" : null,
        selectedFacility.isAllOfAbove ? "All of the above" : null,
      ]
      .filter(Boolean)
      .join(" + ")}
    </p>

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
          {[
            { name: "ER Beds", inpatient: selectedFacility.inPatienterBeds, ambulatory: selectedFacility.ambulatoryerBeds },
            { name: "Holding Beds", inpatient: selectedFacility.inPatientholdingBeds, ambulatory: selectedFacility.ambulatoryholdingBeds },
            { name: "ICU Beds", inpatient: selectedFacility.inPatienticuBeds, ambulatory: selectedFacility.ambulatoryicuBeds },
            { name: "NICU Beds", inpatient: selectedFacility.inPatientnicuBeds, ambulatory: selectedFacility.ambulatorynicuBeds },
            { name: "PICU Beds", inpatient: selectedFacility.inPatientpicuBeds, ambulatory: selectedFacility.ambulatorypicuBeds },
            { name: "Private Beds", inpatient: selectedFacility.inPatientprivateBeds, ambulatory: selectedFacility.ambulatoryprivateBeds },
            { name: "Semi-General Beds", inpatient: selectedFacility.inPatientsemiGeneralBeds, ambulatory: selectedFacility.ambulatorysemiGeneralBeds },
            { name: "Specialized Care Beds", inpatient: selectedFacility.inPatientspecializedCareBeds, ambulatory: selectedFacility.ambulatoryspecializedCareBeds }
          ].map((bed, index) => (
            <tr key={index}>
              <td>{bed.name}</td>
              <td>{bed.inpatient || '-'}</td>
              <td>{bed.ambulatory || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
                  </div> }
                </div>
                <div className="modal-footer">
                <button type="button" className="btn  " style={{backgroundColor:'#b61319' ,color:'white'}} onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showPolyModal   && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title"> Poly Clinic Facility Details - {selectedFacility?.privateOwner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  { <div id="detailsContent">
                  {selectedFacility && (
  <div>
    {selectedFacility.clinicName && 
  <p>
    <strong>Q1: What services are you providing at this facility?</strong><br />
    Ans: {selectedFacility.clinicName}
    {/* {[
      selectedFacility.isHomeopathyOPD && "Homeopathy OPD",
      selectedFacility.isDispensingHomeopathyMedicine && "Dispensing Homeopathy Medicine"
    ]
    .filter(Boolean)
    .join(", ")} */}
  </p>
}
    {selectedFacility.clinictype && 
      <p><strong>Q2: SHCC Assigned Category?</strong><br /> Ans: {selectedFacility.clinictype}</p>
    }
    
    {(selectedFacility.ownership || selectedFacility.privateOwner) && 
      <p><strong>Q3: Who owns the facility?</strong><br />
        OwnerShip Type: {selectedFacility.ownership || ''}
        {selectedFacility.privateOwner && <><br /> Onwer Name: {selectedFacility.privateOwner}</>}
      </p>
    }
    
    {(selectedFacility.managerName || selectedFacility.managerDesignation || selectedFacility.managementType) && 
      <p><strong>Q4: Who manages the Facility?</strong><br />
        Name: {selectedFacility.managerName || ''}
        {selectedFacility.managerDesignation && <><br />Designation: {selectedFacility.managerDesignation}</>}
        {selectedFacility.managementType && <><br /> Manager: {selectedFacility.managementType}</>}
      </p>
    }
    
    {selectedFacility.serviceLevel && 
      <p><strong>Q5: What is the service level category?</strong><br /> Ans: {selectedFacility.serviceLevel}</p>
    }
    
    <p>
      <strong>Q6: What is the operational level category?</strong><br />
      Ans: {[
        selectedFacility.isOutPatient ? "Out Patient" : null,
        selectedFacility.isAmbulatoryCare ? "Ambulatory Care" : null,
        selectedFacility.isInPatient ? "In-Patient" : null,
        selectedFacility.isRehabilitation ? "Rehabilitation" : null,
        selectedFacility.isDiagnostics ? "Diagnostics" : null,
        selectedFacility.isAllOfAbove ? "All of the above" : null,
      ]
      .filter(Boolean)
      .join(" + ")}
    </p>

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
          {[
            { name: "ER Beds", inpatient: selectedFacility.inPatienterBeds, ambulatory: selectedFacility.ambulatoryerBeds },
            { name: "Holding Beds", inpatient: selectedFacility.inPatientholdingBeds, ambulatory: selectedFacility.ambulatoryholdingBeds },
            { name: "ICU Beds", inpatient: selectedFacility.inPatienticuBeds, ambulatory: selectedFacility.ambulatoryicuBeds },
            { name: "NICU Beds", inpatient: selectedFacility.inPatientnicuBeds, ambulatory: selectedFacility.ambulatorynicuBeds },
            { name: "PICU Beds", inpatient: selectedFacility.inPatientpicuBeds, ambulatory: selectedFacility.ambulatorypicuBeds },
            { name: "Private Beds", inpatient: selectedFacility.inPatientprivateBeds, ambulatory: selectedFacility.ambulatoryprivateBeds },
            { name: "Semi-General Beds", inpatient: selectedFacility.inPatientsemiGeneralBeds, ambulatory: selectedFacility.ambulatorysemiGeneralBeds },
            { name: "Specialized Care Beds", inpatient: selectedFacility.inPatientspecializedCareBeds, ambulatory: selectedFacility.ambulatoryspecializedCareBeds }
          ].map((bed, index) => (
            <tr key={index}>
              <td>{bed.name}</td>
              <td>{bed.inpatient || '-'}</td>
              <td>{bed.ambulatory || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
                  </div> }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showSpecialtyModal   && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title"> Special Facility Details - {selectedFacility?.privateOwner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  { <div id="detailsContent">
                  {selectedFacility && (
  <div>
    {selectedFacility.clinicName && 
  <p>
    <strong>Q1: What services are you providing at this facility?</strong><br />
    Ans: {selectedFacility.clinicName}
    {/* {[
      selectedFacility.isHomeopathyOPD && "Homeopathy OPD",
      selectedFacility.isDispensingHomeopathyMedicine && "Dispensing Homeopathy Medicine"
    ]
    .filter(Boolean)
    .join(", ")} */}
  </p>
}
    {selectedFacility.clinictype && 
      <p><strong>Q2: SHCC Assigned Category?</strong><br /> Ans: {selectedFacility.clinictype}</p>
    }
    
    {(selectedFacility.ownership || selectedFacility.privateOwner) && 
      <p><strong>Q3: Who owns the facility?</strong><br />
        OwnerShip Type: {selectedFacility.ownership || ''}
        {selectedFacility.privateOwner && <><br /> Owner Name: {selectedFacility.privateOwner}</>}
      </p>
    }
    
    {(selectedFacility.managerName || selectedFacility.managerDesignation || selectedFacility.managementType) && 
      <p><strong>Q4: Who manages the Facility?</strong><br />
        Name: {selectedFacility.managerName || ''}
        {selectedFacility.managerDesignation && <><br /> Designation: {selectedFacility.managerDesignation}</>}
        {selectedFacility.managementType && <><br /> Management: {selectedFacility.managementType}</>}
      </p>
    }
    
    {selectedFacility.serviceLevel && 
      <p><strong>Q5: What is the service level category?</strong><br /> Ans: {selectedFacility.serviceLevel}</p>
    }
    
    <p>
      <strong>Q6: What is the operational level category?</strong><br />
      Ans: {[
        selectedFacility.isOutPatient ? "Out Patient" : null,
        selectedFacility.isAmbulatoryCare ? "Ambulatory Care" : null,
        selectedFacility.isInPatient ? "In-Patient" : null,
        selectedFacility.isRehabilitation ? "Rehabilitation" : null,
        selectedFacility.isDiagnostics ? "Diagnostics" : null,
        selectedFacility.isAllOfAbove ? "All of the above" : null,
      ]
      .filter(Boolean)
      .join(" + ")}
    </p>

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
          {[
            { name: "ER Beds", inpatient: selectedFacility.inPatienterBeds, ambulatory: selectedFacility.ambulatoryerBeds },
            { name: "Holding Beds", inpatient: selectedFacility.inPatientholdingBeds, ambulatory: selectedFacility.ambulatoryholdingBeds },
            { name: "ICU Beds", inpatient: selectedFacility.inPatienticuBeds, ambulatory: selectedFacility.ambulatoryicuBeds },
            { name: "NICU Beds", inpatient: selectedFacility.inPatientnicuBeds, ambulatory: selectedFacility.ambulatorynicuBeds },
            { name: "PICU Beds", inpatient: selectedFacility.inPatientpicuBeds, ambulatory: selectedFacility.ambulatorypicuBeds },
            { name: "Private Beds", inpatient: selectedFacility.inPatientprivateBeds, ambulatory: selectedFacility.ambulatoryprivateBeds },
            { name: "Semi-General Beds", inpatient: selectedFacility.inPatientsemiGeneralBeds, ambulatory: selectedFacility.ambulatorysemiGeneralBeds },
            { name: "Specialized Care Beds", inpatient: selectedFacility.inPatientspecializedCareBeds, ambulatory: selectedFacility.ambulatoryspecializedCareBeds }
          ].map((bed, index) => (
            <tr key={index}>
              <td>{bed.name}</td>
              <td>{bed.inpatient || '-'}</td>
              <td>{bed.ambulatory || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
                  </div> }
                </div>
                <div className="modal-footer">
                <button type="button" className="btn  " style={{backgroundColor:'#b61319' ,color:'white'}} onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showDentalModal   && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title"> Dental Facility Details - {selectedFacility?.privateOwner}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  { <div id="detailsContent">
                  {selectedFacility && (
  <div>
    {selectedFacility.clinicName && 
  <p>
    <strong>Q1: What services are you providing at this facility?</strong><br />
    Ans: {selectedFacility.clinicName}
    {/* {[
      selectedFacility.isHomeopathyOPD && "Homeopathy OPD",
      selectedFacility.isDispensingHomeopathyMedicine && "Dispensing Homeopathy Medicine"
    ]
    .filter(Boolean)
    .join(", ")} */}
  </p>
}
    {selectedFacility.clinictype && 
      <p><strong>Q2: SHCC Assigned Category?</strong><br />Ans : {selectedFacility.clinictype} (BDS Doctor)</p>
    }
    
    {(selectedFacility.ownership || selectedFacility.privateOwner) && 
      <p><strong>Q3: Who owns the facility?</strong><br />
         OnwerShip Type: {selectedFacility.ownership || ''}
          {selectedFacility.privateOwner && <><br />Onwer Name: {selectedFacility.privateOwner}</>}
      </p>
    }
    
    {(selectedFacility.managerName || selectedFacility.managerDesignation || selectedFacility.managementType) && 
      <p><strong>Q4: Who manages the Facility?</strong><br />
        Name: {selectedFacility.managerName || ''}
        {selectedFacility.managerDesignation && <><br /> Designation: {selectedFacility.managerDesignation}</>}
        {selectedFacility.managementType && <><br /> Management Category: {selectedFacility.managementType}</>}
      </p>
    }
    
    {selectedFacility.serviceLevel && 
      <p><strong>Q5: What is the service level category?</strong><br /> Ans: {selectedFacility.serviceLevel}</p>
    }
    
    <p>
      <strong>Q6: What is the operational level category?</strong><br />
      Ans: {[
        selectedFacility.isOutPatient ? "Out Patient" : null,
        selectedFacility.isAmbulatoryCare ? "Ambulatory Care" : null,
        selectedFacility.isInPatient ? "In-Patient" : null,
        selectedFacility.isRehabilitation ? "Rehabilitation" : null,
        selectedFacility.isDiagnostics ? "Diagnostics" : null,
        // selectedFacility.isAllOfAbove ? "All of the above" : null,
      ]
      .filter(Boolean)
      .join(" + ")}
    </p>

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
          {[
            { name: "ER Beds", inpatient: selectedFacility.inPatienterBeds, ambulatory: selectedFacility.ambulatoryerBeds },
            { name: "Holding Beds", inpatient: selectedFacility.inPatientholdingBeds, ambulatory: selectedFacility.ambulatoryholdingBeds },
            { name: "ICU Beds", inpatient: selectedFacility.inPatienticuBeds, ambulatory: selectedFacility.ambulatoryicuBeds },
            { name: "NICU Beds", inpatient: selectedFacility.inPatientnicuBeds, ambulatory: selectedFacility.ambulatorynicuBeds },
            { name: "PICU Beds", inpatient: selectedFacility.inPatientpicuBeds, ambulatory: selectedFacility.ambulatorypicuBeds },
            { name: "Private Beds", inpatient: selectedFacility.inPatientprivateBeds, ambulatory: selectedFacility.ambulatoryprivateBeds },
            { name: "Semi-General Beds", inpatient: selectedFacility.inPatientsemiGeneralBeds, ambulatory: selectedFacility.ambulatorysemiGeneralBeds },
            { name: "Specialized Care Beds", inpatient: selectedFacility.inPatientspecializedCareBeds, ambulatory: selectedFacility.ambulatoryspecializedCareBeds }
          ].map((bed, index) => (
            <tr key={index}>
              <td>{bed.name}</td>
              <td>{bed.inpatient || '-'}</td>
              <td>{bed.ambulatory || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
                  </div> }
                </div>
                <div className="modal-footer">
                <button type="button" className="btn  " style={{backgroundColor:'#b61319' ,color:'white'}} onClick={handleCloseModals}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Status Change</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to change the status of <strong>{selectedFacility?.privateOwner}</strong> from <strong>{selectedFacility?.status}</strong> to <strong>{newStatus}</strong>?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn " style={{backgroundColor:'#b61319',color:'white'}} onClick={handleCloseModals}>Cancel</button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => updateFacilityStatus(selectedFacility.id, newStatus)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* License Modal */}
        {showLicenseModal && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">License Information</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModals}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="licenseName" className="form-label">License Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="licenseName"
                      value={licenseData.licenseName}
                      onChange={(e) => setLicenseData({...licenseData, licenseName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="licenseImage" className="form-label">License Image</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="licenseImage"
                      accept="image/*"
                      onChange={handleLicenseImageChange}
                      required
                    />
                    {licenseData.licenseImage && (
                      <div className="mt-2">
                        <img 
                          src={licenseData.licenseImage} 
                          alt="License preview" 
                          style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn " style={{color:'white',backgroundColor:'#b61319'}} onClick={handleCloseModals}>Cancel</button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => updateFacilityStatus(selectedFacility.id, 'Licensed', licenseData)}
                    disabled={!licenseData.licenseName || !licenseData.licenseImage}
                  >
                    Submit License
                  </button>
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