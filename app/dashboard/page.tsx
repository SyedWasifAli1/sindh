










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

"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase-config";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";

interface Facility {
  id: string;
  cityName: string;
  status: string;
  latitude: number;
  longitude: number;
  clinicName: string;
  clinicType: string;
  createdDate?: { seconds: number; nanoseconds: number }; // Updated to match Firestore timestamp
}

// interface ChartData {
//   name: string;
//   value: number;
// }

interface ClinicData {
  title: string;
  value: number;
  trend: number;
}

interface StatusData {
  title: string;
  value: number;
}

const Dashboard = () => {
  const [markers, setMarkers] = useState<Facility[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Facility | null>(null);
  const [clinicData, setClinicData] = useState<ClinicData[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  // const [registrationChartData, setRegistrationChartData] = useState<ChartData[]>([]);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const getRegistrationChartData = () => {
    const monthCounts = Array(12).fill(0);
    const currentYear = new Date().getFullYear();
    
    markers.forEach(facility => {
      let date: Date | null = null;
      
      if (facility.createdDate?.seconds) {
        date = new Date(facility.createdDate.seconds * 1000);
      } else if (typeof facility.createdDate === 'string') {
        date = new Date(facility.createdDate);
      } else if (typeof facility.createdDate === 'number') {
        date = new Date(facility.createdDate);
      }
      
      if (date && date.getFullYear() === currentYear) {
        const month = date.getMonth();
        monthCounts[month]++;
      }
    });
    
    return Array.from({ length: 12 }, (_, i) => ({
      name: `${new Date(currentYear, i, 1).toLocaleString('default', { month: 'short' })} '${currentYear.toString().slice(2)}`,
      value: monthCounts[i]
    }));
  };
  const registrationChartData = getRegistrationChartData();

  useEffect(() => {
    const facilitiesRef = collection(firestore, "facility_selections");

    const unsubscribe = onSnapshot(facilitiesRef, (snapshot) => {
      const facilitiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        cityName: doc.data().cityName,
        status: doc.data().status,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
        clinicName: doc.data().privateOwner,
        clinicType: doc.data().clinictype,
        createdDate: doc.data().createdDate // This should be a Firestore timestamp
      })) as Facility[];

      setMarkers(facilitiesData);
      processData(facilitiesData);
    });

    return () => unsubscribe();
  }, []);

  const processData = (facilities: Facility[]) => {
    // Process clinic type data with trends
    const clinicCounts = facilities.reduce((acc, facility) => {
      if (facility.clinicType) {
        acc[facility.clinicType] = (acc[facility.clinicType] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const allowedClinics = [
      "Homeopathy Clinic",
      "TibbMatab Clinic",
      "GP Clinic",
      "Poly Clinic",
      "Single Specailty Clinic / Consultant Clinic",
      "Dental Clinic",
    ];

    // Calculate trends for each clinic type based on last 30 days vs previous period
    const clinicDataArray = allowedClinics.map((clinicType) => {
      const currentCount = clinicCounts[clinicType] || 0;
      
      // Calculate trend based on registrations in last 30 days vs previous period
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      
      const recentCount = facilities.filter(f => 
        f.clinicType === clinicType && 
        f.createdDate && 
        new Date(f.createdDate.seconds * 1000) > thirtyDaysAgo
      ).length;
      
      const previousCount = facilities.filter(f => 
        f.clinicType === clinicType && 
        f.createdDate && 
        new Date(f.createdDate.seconds * 1000) > sixtyDaysAgo &&
        new Date(f.createdDate.seconds * 1000) <= thirtyDaysAgo
      ).length;
      
      let trend = 0;
      if (previousCount > 0) {
        trend = Math.round(((recentCount - previousCount) / previousCount) * 100);
      } else if (recentCount > 0) {
        trend = 100; // infinite growth from 0
      }
      
      return {
        title: clinicType,
        value: currentCount,
        trend: trend
      };
    });

    setClinicData(clinicDataArray);

    // Process status data
    const statusCounts = facilities.reduce((acc, facility) => {
      if (facility.status) {
        acc[facility.status] = (acc[facility.status] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const allowedStatuses = ["Un-Registered", "Registered", "Licensed"];
    const statusDataArray = allowedStatuses.map((status) => ({
      title: status,
      value: statusCounts[status] || 0,
    }));

    setStatusData(statusDataArray);

    // Generate registration chart data (monthly)
    const now = new Date();
    const monthsData: Record<string, number> = {};
    
    // Initialize last 12 months
    for (let i = 0; i < 12; i++) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - i);
      const monthYear = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
      monthsData[monthYear] = 0;
    }
    
    // Count registrations per month
    facilities.forEach(facility => {
      if (facility.createdDate) {
        const date = new Date(facility.createdDate.seconds * 1000);
        const monthYear = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
        
        if (monthsData.hasOwnProperty(monthYear)) {
          monthsData[monthYear]++;
        }
      }
    });
    
    // Convert to chart data format and reverse to show chronological order
    // const chartData = Object.entries(monthsData)
    //   .map(([name, value]) => ({ name, value }))
    //   .reverse();
    
    // setRegistrationChartData(chartData);
  };

  const SINDH_CENTER = { lat: 25.396, lng: 68.3578 };
  const SINDH_BOUNDS = { north: 28.5, south: 23.5, east: 71.0, west: 66.0 };

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registered":
        return "#696969";
      case "Un-Registered":
        return "#b61319";
      case "Licensed":
        return "#006400";
      default:
        return "#696969";
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        {/* Map Section */}
        <div className="row">
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Sindh Cities Map</h5>
                <div className="mb-4" style={{ borderRadius: "10px", overflow: "hidden" }}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={6}
                    center={SINDH_CENTER}
                    options={{
                      restriction: { latLngBounds: SINDH_BOUNDS, strictBounds: false },
                      minZoom: 7,
                    }}
                  >
                    {markers.map((marker) => {
                      let iconUrl = "";
                      switch (marker.status) {
                        case "Registered":
                          iconUrl = "/assets/images/logos/logo.png";
                          break;
                        case "UnRegistered":
                          iconUrl = "/assets/images/logos/logo.png";
                          break;
                        case "Licensed":
                          iconUrl = "/assets/images/logos/logo.png";
                          break;
                        default:
                          return null;
                      }
                      return (
                        <Marker
                          key={marker.id}
                          position={{ lat: marker.latitude, lng: marker.longitude }}
                          icon={{ url: iconUrl, scaledSize: new google.maps.Size(40, 40) }}
                          onClick={() => setSelectedMarker(marker)}
                        />
                      );
                    })}
                    {selectedMarker && (
                      <InfoWindow
                        position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div className="mx-3">
                          <b>{selectedMarker.clinicName}</b>
                          <br />
                          <b>{selectedMarker.cityName}</b>
                          <br />
                          <p>Status: <b>{selectedMarker.status}</b></p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </div>

                {/* Registration Chart */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">Monthly Registrations</h5>
                    <div style={{ height: "200px" }}>
                      {/* <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={registrationChartData}>
                          <XAxis 
                            dataKey="name"  
                            tick={{ fill: '#666', fontSize: 12 }}
                          />
                          <YAxis 
                            tick={{ fill: '#666', fontSize: 12 }}
                          />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#b61319" 
                            strokeWidth={2} 
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer> */}
                      

<ResponsiveContainer width="100%" height="100%">
  <LineChart data={registrationChartData}>
    <XAxis 
      dataKey="name"  
      tick={{ fill: '#666', fontSize: 12 }}
    />
    <YAxis 
      tick={{ fill: '#666', fontSize: 12 }}
    />
    <Tooltip 
      formatter={(value: number) => [`${value} Registrations`, 'Count']}
      labelFormatter={(label) => `Month: ${label}`}
    />
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#b61319" 
      strokeWidth={2} 
      dot={{ r: 4 }} 
      activeDot={{ r: 6, fill: '#b61319', strokeWidth: 0 }} 
    />
  </LineChart>
</ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="row">
                  {statusData.map((status, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <div 
                        className="card position-relative overflow-hidden" 
                        style={{ 
                          height: "120px",
                          backgroundColor: getStatusColor(status.title),
                          color: "white",
                          borderRadius: "10px"
                        }}
                      >
                        <div 
                          style={{
                            position: "absolute",
                            top: "-20px",
                            left: "-20px",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.15)"
                          }}
                        ></div>
                        
                        <div 
                          style={{
                            position: "absolute",
                            bottom: "-30px",
                            right: "-30px",
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.1)"
                          }}
                        ></div>

                        <div className="card-body position-relative d-flex flex-column justify-content-between h-100">
                          <h6 className="mb-1 text-white fw-semibold" style={{ fontSize: "0.9rem" }}>{status.title}</h6>
                          <div>
                            <h3 className="mb-0 text-white fw-bold" style={{ fontSize: "1.8rem" }}>{status.value}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Cards with Chart */}
          <div className="col-lg-5">
            <div className="card" style={{paddingBottom: ""}}>
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-3">Clinic Types</h5>
                <div className="row">
                  {clinicData.map((clinic, idx) => {
                    const isPositiveTrend = clinic.trend >= 0;
                    return (
                      <div className="col-md-6 mb-3" key={idx}>
                        <div className="card" style={{ height: "186px" }}>
                          <div className="card-body d-flex flex-column justify-content-between">
                            <h6 className="fw-semibold text-truncate">{clinic.title}</h6>
                            <h6>{clinic.value}</h6>
                            <div className="d-flex t-sm align-items-center mb-1">
                              {isPositiveTrend ? (
                                <FaArrowUp className="text-success me-2" />
                              ) : (
                                <FaArrowDown className="text-danger me-2" />
                              )}
                              <p className={`mb-0 ${isPositiveTrend ? 'text-success' : 'text-danger'}`}>
                                {Math.abs(clinic.trend)}% {isPositiveTrend ? 'increase' : 'decrease'}
                              </p>
                            </div>
                            <ResponsiveContainer width="100%" height={40}>
                              <LineChart data={registrationChartData.slice(0, 4)}>
                                <XAxis 
                                  dataKey="name"
                                  tick={{ fontSize: 10 }}
                                  height={12}
                                />
                                <YAxis 
                                  width={20}
                                  tick={{ fontSize: 10 }}
                                  tickCount={3}
                                />
                                <Tooltip />
                                <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={isPositiveTrend ? "#28a745" : "#dc3545"} 
                                  strokeWidth={2} 
                                  dot={false} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;