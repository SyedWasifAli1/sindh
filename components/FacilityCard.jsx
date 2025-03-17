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
import { firestore, collection, getDocs, doc, updateDoc } from '../app/lib/firebase-config'; // Import updateDoc

const FacilityCard = () => {
  const [facilities, setFacilities] = useState([]); // Combined facilities data
  const [filteredFacilities, setFilteredFacilities] = useState([]); // Filtered facilities
  const [showModal, setShowModal] = useState(false); // Modal control
  const [loading, setLoading] = useState(true); // Loading state

  // Firestore se data fetch karein aur combine karein
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch facility_selections data
        const facilitiesRef = collection(firestore, 'facility_selections');
        const facilitiesSnapshot = await getDocs(facilitiesRef);
        const facilitiesData = facilitiesSnapshot.docs.map(doc => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));

        // Fetch user_locations data
        const locationsRef = collection(firestore, 'user_locations');
        const locationsSnapshot = await getDocs(locationsRef);
        const locationsData = locationsSnapshot.docs.map(doc => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));

        // Combine data based on uid
        const combinedData = facilitiesData.map(facility => {
          const location = locationsData.find(loc => loc.id === facility.id);
          return {
            ...facility,
            city: location ? location.city : 'N/A', // Add city from user_locations
          };
        });

        setFacilities(combinedData);
        setFilteredFacilities(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const questions = [
    { question: "What is the facility's primary service?", answer: "General healthcare services." },
    { question: "How many staff members are employed?", answer: "25 staff members." },
    { question: "Is the facility operational 24/7?", answer: "Yes, the facility operates 24/7." },
    { question: "What types of medical equipment are available?", answer: "X-ray machines, ultrasound, and lab equipment." },
    { question: "Does the facility have an emergency department?", answer: "Yes, it has a fully equipped emergency department." },
    // Add more questions as needed
  ];

  const filterFacilities = () => {
    const cityFilter = document.getElementById("cityFilter").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
    const searchQuery = document.getElementById("searchFacility").value.toLowerCase();

    const filtered = facilities.filter(facility => {
      const matchesCity = cityFilter ? facility.city.toLowerCase() === cityFilter : true;
      const matchesStatus = statusFilter ? facility.status === statusFilter : true;
      const matchesSearch = searchQuery ? facility.facility.toLowerCase().includes(searchQuery) : true;

      return matchesCity && matchesStatus && matchesSearch;
    });

    setFilteredFacilities(filtered);
  };

  const updateFacilityStatus = async (facilityId, newStatus) => {
    try {
      // Update status in Firestore
      const facilityRef = doc(firestore, 'facility_selections', facilityId);
      await updateDoc(facilityRef, { status: newStatus });

      // Update status in local state
      const updatedFacilities = facilities.map(facility => {
        if (facility.id === facilityId) {
          return { ...facility, status: newStatus };
        }
        return facility;
      });

      setFacilities(updatedFacilities);
      filterFacilities(); // Re-apply filters
    } catch (error) {
      console.error("Error updating facility status: ", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true); // Modal open karein
  };

  const handleCloseModal = () => {
    setShowModal(false); // Modal close karein
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
              <option value="Karachi">Karachi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Sukkur">Sukkur</option>
              <option value="Larkana">Larkana</option>
              <option value="Mirpur Khas">Mirpur Khas</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
            <select className="form-select" id="statusFilter" onChange={filterFacilities}>
              <option value="">All Statuses</option>
              <option value="registered">Registered</option>
              <option value="unregistered">Unregistered</option>
              <option value="licensed">Licensed</option>
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
                  <td>{facility.privateowner}</td>
                  <td>{facility.clinicname}</td>
                  <td>{facility.city}</td>
                  <td>
                    <select
                      className="form-select status-select"
                      value={facility.status}
                      onChange={(e) => updateFacilityStatus(facility.id, e.target.value)}
                    >
                      <option value="registered">Registered</option>
                      <option value="unregistered">Unregistered</option>
                      <option value="licensed">Licensed</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                    <button className="btn btn-sm btn-info" onClick={handleShowModal}>Show Questioning</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Facility Questioning</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div id="questioningContent">
                    {questions.map((q, index) => (
                      <div className="question-item" key={index}>
                        <strong>Q{index + 1}: {q.question}</strong>
                        <p>A: {q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
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