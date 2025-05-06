import React, { useState, useEffect } from 'react';
import { firestore, doc, updateDoc } from '../app/lib/firebase-config';

const EditFacilityModal = ({ facility, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    privateOwner: '',
    clinicName: '',
    clinictype: '',
    cityName: '',
    status: '',
    // Add other fields as needed
  });

  useEffect(() => {
    if (facility) {
      setFormData({
        privateOwner: facility.privateOwner || '',
        clinicName: facility.clinicName || '',
        clinictype: facility.clinictype || '',
        cityName: facility.cityName || '',
        status: facility.status || '',
        // Initialize other fields
      });
    }
  }, [facility]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const facilityRef = doc(firestore, 'facility_selections', facility.id);
      await updateDoc(facilityRef, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating facility: ", error);
      alert('Failed to update facility');
    }
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(74, 77, 74, 0.25)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Facility - {facility?.privateOwner}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Owner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="privateOwner"
                    value={formData.privateOwner}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Clinic Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Clinic Type</label>
                  <select
                    className="form-select"
                    name="clinictype"
                    value={formData.clinictype}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Homeopathy Clinic">Homeopathy Clinic</option>
                    <option value="TibbMatab Clinic">TibbMatab Clinic</option>
                    <option value="GP Clinic">GP Clinic</option>
                    <option value="Poly Clinic">Poly Clinic</option>
                    <option value="Consultant / Single Specialty Clinic">Consultant / Single Specialty Clinic</option>
                    <option value="Dental Clinic">Dental Clinic</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Registered">Registered</option>
                    <option value="Un-Registered">Un-Registered</option>
                    <option value="Licensed">Licensed</option>
                  </select>
                </div>
              </div>
              
              {/* Add more fields as needed */}
              
              <div className="modal-footer">
                <button type="button" className="btn "  style={{
    backgroundColor: "rgb(182, 19, 25)",
    color: "white",
  }} onClick={onClose}>Cancel</button>
                <button type="submit" className="btn "  style={{
    backgroundColor: "rgb(24, 80, 16)",
    color: "white",
  }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFacilityModal;