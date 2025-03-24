










// "use client"; // Mark this as a client component if needed

// import React, { useEffect, useState } from "react";
// import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
// import { collection, onSnapshot } from "firebase/firestore";
// import { firestore } from "../lib/firebase-config"; // Adjust the import path as needed
// import {
//   FaChartLine,
//   FaCalendarAlt,
//   FaArrowUp,
//   FaArrowDown,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaCertificate,
//   FaDollarSign,
// } from "react-icons/fa";

// // Define types for the facility data
// interface Facility {
//   id: string;
//   cityName: string;
//   status: string;
//   latitude: number;
//   longitude: number;
// }

// const cardData = [
//   {
//     title: "Registered",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-success",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "UnRegistered",
//     value: "1,200",
//     icon: <FaTimesCircle className="me-2" />,
//     bgColor: "bg-danger",
//     percentage: "+5%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "Licensed",
//     value: "4,500",
//     icon: <FaCertificate className="me-2" />,
//     bgColor: "bg-warning",
//     percentage: "+12%",
//     percentageColor: "text-success",
//     arrow: <FaArrowUp className="text-success" />,
//   },
//   {
//     title: "Homeopathy",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-white",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "Tibb Matab",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-white",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "GP Clinic",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-white",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "Polyclinic",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-white",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "Consultant Clinic",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-white",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
//   {
//     title: "Dental Clinic",
//     value: "6,820",
//     icon: <FaCheckCircle className="me-2" />,
//     bgColor: "bg-white",
//     percentage: "+9%",
//     percentageColor: "text-danger",
//     arrow: <FaArrowDown className="text-danger" />,
//   },
// ];

// const Dashboard = () => {
//   const [markers, setMarkers] = useState<Facility[]>([]); // State to store markers
//   const [selectedMarker, setSelectedMarker] = useState<Facility | null>(null); // State for selected marker
//   const [selectedCity, setSelectedCity] = useState(""); // State for selected city filter
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//   });

//   // Fetch markers from Firestore
//   useEffect(() => {
//     const facilitiesRef = collection(firestore, "facility_selections");

//     // Listen for changes in facility_selections
//     const unsubscribe = onSnapshot(facilitiesRef, (snapshot) => {
//       const facilitiesData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         cityName: doc.data().cityName,
//         status: doc.data().status,
//         latitude: doc.data().latitude,
//         longitude: doc.data().longitude,
//       })) as Facility[];

//       // Log fetched data for debugging
//       console.log("Fetched markers:", facilitiesData);

//       // Update markers state with fetched data
//       setMarkers(facilitiesData);
//     });

//     // Cleanup listener on unmount
//     return () => unsubscribe();
//   }, []);

//   // Handle city filter change
//   const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCity(event.target.value);
//   };

//   // Filter markers based on selected city
//   const filteredMarkers = selectedCity
//     ? markers.filter((marker) => marker.cityName === selectedCity)
//     : markers;

//   // Map container style
//   const mapContainerStyle = {
//     width: "100%",
//     height: "300px",
//   };

//   // Center of the map (Pakistan)
//   const center = {
//     lat: 30.3753, // Latitude for Pakistan
//     lng: 69.3451, // Longitude for Pakistan
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div className="body-wrapper-inner">
//       <div className="container-fluid">
//         {/* Row 1 */}
//         <div className="row">
//           <div className="col-lg-12 d-flex align-items-stretch">
//             <div className="card w-100">
//               <div className="card-body">
//                 <h5 className="card-title fw-semibold">Sindh Cities Map</h5>
//                 {/* City Filter Dropdown */}
//                 <div className="mb-3">
//                   <label htmlFor="cityFilter" className="form-label">
//                     Filter by City
//                   </label>
//                   <select
//                     className="form-select"
//                     id="cityFilter"
//                     value={selectedCity}
//                     onChange={handleCityChange}
//                   >
//                     <option value="">All Cities</option>
//                     {Array.from(new Set(markers.map((marker) => marker.cityName))).map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* Google Map */}
//                 <GoogleMap mapContainerStyle={mapContainerStyle} zoom={6} center={center}>
//                   {markers.map((marker) => (
//                     <Marker
//                       key={marker.id}
//                       position={{ lat: marker.latitude, lng: marker.longitude }}
//                       title={marker.cityName}
//                       icon={{
//                         url: "/assets/images/logos/logo.png", // Replace with your image URL
//                         scaledSize: new google.maps.Size(40, 40), // Adjust size as needed
//                       }}
//                       onClick={() => setSelectedMarker(marker)}
//                     />
//                   ))}
//                   {selectedMarker && (
//                     <InfoWindow
//                       position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
//                       onCloseClick={() => setSelectedMarker(null)}
//                     >
//                       <div>
//                         <b>{selectedMarker.cityName}</b>
//                         <br />
//                         <p>Status: <b>{selectedMarker.status}</b></p>
//                         <a href="">View More</a>
//                       </div>
//                     </InfoWindow>
//                   )}
//                 </GoogleMap>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Yearly Breakup and Monthly Earnings Cards */}
//         <div className="col-lg-12">
//           <div className="row">
//             {/* Yearly Breakup Card */}
//             <div className="col-lg-6">
//               <div className="card overflow-hidden">
//                 <div className="card-body p-4">
//                   <h5 className="card-title mb-9 fw-semibold">
//                     <FaChartLine className="me-2" /> Yearly Registration Breakup
//                   </h5>
//                   <div className="row align-items-center">
//                     <div className="col-7">
//                       <h4 className="fw-semibold mb-3">36,358</h4>
//                       <div className="d-flex align-items-center mb-3">
//                         <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
//                           <FaArrowUp className="text-success" />
//                         </span>
//                         <p className="text-dark me-1 fs-3 mb-0">+9%</p>
//                         <p className="fs-3 mb-0">last year</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Monthly Earnings Card */}
//             <div className="col-lg-6">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="row align-items-start">
//                     <div className="col-8">
//                       <h5 className="card-title mb-9 fw-semibold">
//                         <FaCalendarAlt className="me-2" /> Monthly Registration
//                       </h5>
//                       <h4 className="fw-semibold mb-3">6,820</h4>
//                       <div className="d-flex align-items-center pb-1">
//                         <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
//                           <FaArrowDown className="text-danger" />
//                         </span>
//                         <p className="text-dark me-1 fs-3 mb-0">+9%</p>
//                         <p className="fs-3 mb-0">last year</p>
//                       </div>
//                     </div>
//                     <div className="col-4">
//                       <div className="d-flex justify-content-end">
//                         <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
//                           <FaDollarSign className="fs-6" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Render cards dynamically */}
//         <div className="col-lg-12">
//           <div className="row">
//             {cardData.map((card, index) => (
//               <div className="col-lg-4" key={index}>
//                 <div className={`card ${card.bgColor}`}>
//                   <div className="card-body">
//                     <div className="row align-items-start">
//                       <div className="col-8">
//                         <h5 className="card-title mb-9 fw-semibold">
//                           {card.icon} {card.title}
//                         </h5>
//                         <h4 className="fw-semibold mb-3">{card.value}</h4>
//                         <div className="d-flex align-items-center pb-1">
//                           <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
//                             {card.arrow}
//                           </span>
//                           <p className={`text-dark me-1 fs-3 mb-0 ${card.percentageColor}`}>
//                             {card.percentage}
//                           </p>
//                           <p className="fs-3 mb-0">last year</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="py-6 px-6 text-center">
//         <p className="mb-0 fs-4">
//           Developed in:{" "}
//           <a
//             href="https://adminmart.com/"
//             target="_blank"
//             className="pe-1 text-primary text-decoration-underline"
//           >
//             March 2025
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;














"use client"; // Mark this as a client component if needed

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase-config"; // Adjust the import path as needed
import {
  FaChartLine,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  // FaTimesCircle,
  // FaCertificate,
  FaDollarSign,
} from "react-icons/fa";

// Define types for the facility data
interface Facility {
  id: string;
  cityName: string;
  status: string;
  latitude: number;
  longitude: number;
  clinictype: string; // Add clinicName to the interface
}

const Dashboard = () => {
  const [markers, setMarkers] = useState<Facility[]>([]); // State to store markers
  const [selectedMarker, setSelectedMarker] = useState<Facility | null>(null); // State for selected marker
  const [selectedCity, setSelectedCity] = useState(""); // State for selected city filter
  const [clinicData, setClinicData] = useState<{ title: string; value: number }[]>([]); // State to store clinic data
  const [statusData, setStatusData] = useState<{ title: string; value: number }[]>([]); // State to store status data
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Fetch markers from Firestore
  useEffect(() => {
    const facilitiesRef = collection(firestore, "facility_selections");

    // Listen for changes in facility_selections
    const unsubscribe = onSnapshot(facilitiesRef, (snapshot) => {
      const facilitiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        cityName: doc.data().cityName,
        status: doc.data().status,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
        clinictype: doc.data().clinictype, // Assuming clinicName is a field in your Firestore document
      })) as Facility[];

      // Log fetched data for debugging
      console.log("Fetched markers:", facilitiesData);

      // Update markers state with fetched data
      setMarkers(facilitiesData);

      // Process data to get unique clinic names and their counts
      const clinicCounts = facilitiesData.reduce((acc, facility) => {
        if (facility.clinictype) {
          acc[facility.clinictype] = (acc[facility.clinictype] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Convert clinicCounts to an array of objects
      const clinicDataArray = Object.keys(clinicCounts).map((clinicName) => ({
        title: clinicName,
        value: clinicCounts[clinicName],
      }));

      // Update clinicData state
      setClinicData(clinicDataArray);

      // Process data to get status counts
      const statusCounts = facilitiesData.reduce((acc, facility) => {
        if (facility.status) {
          acc[facility.status] = (acc[facility.status] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Define allowed statuses
      const allowedStatuses = ["Registered", "UnRegistered", "Licensed"];

      // Filter and map status counts to an array of objects
      const statusDataArray = allowedStatuses.map((status) => ({
        title: status,
        value: statusCounts[status] || 0, // Default to 0 if status not found
      }));

      // Update statusData state
      setStatusData(statusDataArray);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Handle city filter change
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };
  const SINDH_CENTER = {
    lat: 25.3960,
    lng: 68.3578
  };
  
  // Approximate bounds for Sindh province
  const SINDH_BOUNDS = {
    north: 28.5,
    south: 23.5,
    east: 71.0,
    west: 66.0
  };

  // Filter markers based on selected city
  const filteredMarkers = selectedCity
    ? markers.filter((marker) => marker.cityName === selectedCity)
    : markers;

  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  // Center of the map (Pakistan)
  // const center = {
  //   lat: 30.3753, // Latitude for Pakistan
  //   lng: 69.3451, // Longitude for Pakistan
  // };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        {/* Row 1 */}
        <div className="row">
          <div className="col-lg-12 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Sindh Cities Map</h5>
                {/* City Filter Dropdown */}
                <div className="mb-3">
                  <label htmlFor="cityFilter" className="form-label">
                    Filter by City
                  </label>
                  <select
                    className="form-select"
                    id="cityFilter"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">All Cities</option>
                    {Array.from(new Set(markers.map((marker) => marker.cityName))).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Google Map */}
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={6}  options={{
          restriction: {
            latLngBounds: SINDH_BOUNDS,
            strictBounds: false 
          },
          minZoom: 7
        }}   center={SINDH_CENTER}>
                  {filteredMarkers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={{ lat: marker.latitude, lng: marker.longitude }}
                      title={marker.cityName}
                      icon={{
                        url: "/assets/images/logos/logo.png", // Replace with your image URL
                        scaledSize: new google.maps.Size(40, 40), // Adjust size as needed
                      }}
                      onClick={() => setSelectedMarker(marker)}
                    />
                  ))}
                  {selectedMarker && (
                    <InfoWindow
                      position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div>
                        <b>{selectedMarker.cityName}</b>
                        <br />
                        <p>Status: <b>{selectedMarker.status}</b></p>
                        <a href="">View More</a>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakup and Monthly Earnings Cards */}
        <div className="col-lg-12">
          <div className="row">
            {/* Yearly Breakup Card */}
            <div className="col-lg-6">
              <div className="card overflow-hidden">
                <div className="card-body p-4">
                  <h5 className="card-title mb-9 fw-semibold">
                    <FaChartLine className="me-2" /> Yearly Registration Breakup
                  </h5>
                  <div className="row align-items-center">
                    <div className="col-7">
                      <h4 className="fw-semibold mb-3">36,358</h4>
                      <div className="d-flex align-items-center mb-3">
                        <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                          <FaArrowUp className="text-success" />
                        </span>
                        <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                        <p className="fs-3 mb-0">last year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Earnings Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-start">
                    <div className="col-8">
                      <h5 className="card-title mb-9 fw-semibold">
                        <FaCalendarAlt className="me-2" /> Monthly Registration
                      </h5>
                      <h4 className="fw-semibold mb-3">6,820</h4>
                      <div className="d-flex align-items-center pb-1">
                        <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                          <FaArrowDown className="text-danger" />
                        </span>
                        <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                        <p className="fs-3 mb-0">last year</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-end">
                        <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                          <FaDollarSign className="fs-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="col-lg-12">
          <div className="row">
            {statusData.map((status, index) => {
              let bgColor = "";
              switch (status.title) {
                case "Registered":
                  bgColor = "bg-success"; // Green for Registered
                  break;
                case "UnRegistered":
                  bgColor = "bg-danger"; // Red for Unregistered
                  break;
                case "Licensed":
                  bgColor = "bg-primary"; // Blue for Licensed
                  break;
                default:
                  bgColor = "bg-secondary"; // Default color
              }

              return (
                <div className="col-lg-4" key={index}>
                  <div className={`card ${bgColor} text-white`}>
                    <div className="card-body">
                      <div className="row align-items-start">
                        <div className="col-8">
                          <h5 className="card-title mb-9 fw-semibold">
                            <FaCheckCircle className="me-2" /> {status.title}
                          </h5>
                          <h4 className="fw-semibold mb-3">{status.value}</h4>
                          <div className="d-flex align-items-center pb-1">
                            <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                              <FaArrowDown className="text-danger" />
                            </span>
                            <p className="text-white me-1 fs-3 mb-0">+9%</p>
                            <p className="fs-3 mb-0">last year</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clinic Cards */}
        <div className="col-lg-12">
          <div className="row">
            {clinicData.map((card, index) => (
              <div className="col-lg-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-start">
                      <div className="col-8">
                        <h5 className="card-title mb-9 fw-semibold">
                          <FaCheckCircle className="me-2" /> {card.title}
                        </h5>
                        <h4 className="fw-semibold mb-3">{card.value}</h4>
                        <div className="d-flex align-items-center pb-1">
                          <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                            <FaArrowDown className="text-danger" />
                          </span>
                          <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                          <p className="fs-3 mb-0">last year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 px-6 text-center">
        <p className="mb-0 fs-4">
          Developed in:{" "}
          <a
            href="https://adminmart.com/"
            target="_blank"
            className="pe-1 text-primary text-decoration-underline"
          >
            March 2025
          </a>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;