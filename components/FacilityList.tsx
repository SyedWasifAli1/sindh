"use client";

import React, { useState, useEffect } from 'react';
import { firestore } from '@/app/lib/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';

interface Facility {
  id: string;
  privateOwner: string;
  cityName: string;
  status: string;
  date: string;
  licenseImage?: string;
}

interface FacilityListProps {
  status: string;
}

const FacilityList: React.FC<FacilityListProps> = ({ status }) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [cityFilter, setCityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const facilitiesRef = collection(firestore, 'facility_selections');
  
    const unsubscribe = onSnapshot(facilitiesRef, (snapshot) => {
      const facilitiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Facility[];
  
      const filteredFacilities = facilitiesData.filter(
        (facility) => facility.status === status
      );
  
      const uniqueCities = Array.from(
        new Set(filteredFacilities.map((facility) => facility.cityName))
      );
  
      setFacilities(filteredFacilities);
      setFilteredFacilities(filteredFacilities);
      setCities(uniqueCities);
    });
  
    return () => unsubscribe();
  }, [status]);

  useEffect(() => {
    const filtered = facilities.filter((facility) => {
      const matchesCity = cityFilter ? facility.cityName === cityFilter : true;
      const matchesSearch = searchQuery
        ? facility.privateOwner.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCity && matchesSearch;
    });

    setFilteredFacilities(filtered);
    setCurrentPage(1);
  }, [cityFilter, searchQuery, facilities]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFacilities.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  // Only show license image column if status is "Licensed"
  const showLicenseImageColumn = status === "Licensed";

  return (
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="facility-card">
              <h5 className="card-title fw-semibold">Facilities with Status: {status}</h5>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label htmlFor="cityFilter" className="form-label">
                    Filter by City
                  </label>
                  <select
                    className="form-select"
                    id="cityFilter"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="searchFacility" className="form-label">
                    Search Facility
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="searchFacility"
                    placeholder="Enter facility name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="itemsPerPage" className="form-label">
                    Items per Page
                  </label>
                  <select
                    className="form-select"
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Facility Name</th>
                      <th>City</th>
                      <th>Status</th>
                      {/* <th>Date</th> */}
                      {showLicenseImageColumn && <th>License Image</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((facility) => (
                      <tr key={facility.id}>
                        <td>{facility.privateOwner}</td>
                        <td>{facility.cityName}</td>
                        <td>
                          <span className={`status-badge ${facility.status.toLowerCase()}`}>
                            {facility.status}
                          </span>
                        </td>
                        {/* <td>{facility.date}</td> */}
                        {showLicenseImageColumn && (
                          <td>
                            {facility.licenseImage ? (
                              <div 
                                className="license-image-thumbnail"
                                onClick={() => handleImageClick(facility.licenseImage!)}
                                style={{ cursor: 'pointer' }}
                              >
                                <Image
                                  src={facility.licenseImage}
                                  alt="License"
                                  width={50}
                                  height={50}
                                  style={{ objectFit: 'cover' }}
                                />
                              </div>
                            ) : (
                              <span>No Image</span>
                            )}
                          </td>
                        )}
                        <td>
                        <div style={{ display: "flex", gap: "8px" }}>

                          <button className="btn btn-sm "   style={{
        backgroundColor: "rgb(24, 80, 16)",
        color: "white",
      }}>Edit</button>
                          <button className="btn btn-sm "  style={{
        backgroundColor: "rgb(182, 19, 25)",
        color: "white",
      }}>Delete</button>
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal - Only shown if status is Licensed */}
      {showLicenseImageColumn && showImageModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setShowImageModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">License Image</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowImageModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <Image
                  src={selectedImage}
                  alt="License Image"
                  width={800}
                  height={600}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityList;