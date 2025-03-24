// "use client";

// import Link from 'next/link';

// import Head from 'next/head';
// import { FaMapMarkerAlt, FaChartLine, FaCalendarAlt, FaArrowUp, FaArrowDown, FaDollarSign } from 'react-icons/fa';

// import withAuth from '../lib/withauth';

//  const DashboardPage = () => {
//   return (
//     <>
//       {/* Meta Tags */}
//       <Head>
//         <Link rel="stylesheet" href="/assets/css/styles.min.css" />
//       </Head>

//       {/* Body Wrapper */}
//       <div className="body-wrapper-inner">
//         <div className="container-fluid">
//           {/* Row 1 */}
//           <div className="row">
//             <div className="col-lg-8 d-flex align-items-stretch">
//               <div className="card w-100">
//                 <div className="card-body">
//                   <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
//                     <div className="mb-3 mb-sm-0">
//                       <h5 className="card-title fw-semibold">
//                         <FaMapMarkerAlt className="me-2" /> Sindh Cities Map
//                       </h5>
//                     </div>
//                     <div>
//                       <select className="form-select" id="citySelect">
//                         <option value="">Show All Sindh</option>
//                         <option value="Karachi">Karachi</option>
//                         <option value="Hyderabad">Hyderabad</option>
//                         <option value="Sukkur">Sukkur</option>
//                         <option value="Larkana">Larkana</option>
//                         <option value="Mirpur Khas">Mirpur Khas</option>
//                       </select>
//                     </div>
//                   </div>
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623549.635514968!2d66.59467796875001!3d26.912433600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c3d5e8b5d5d5d%3A0x5e2e5e2e5e2e5e2e!2sSindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1698765432109!5m2!1sen!2s"
//                     width="100%"
//                     height="300"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-4">
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="card overflow-hidden">
//                     <div className="card-body p-4">
//                       <h5 className="card-title mb-9 fw-semibold">
//                         <FaChartLine className="me-2" /> Yearly Registration Breakup
//                       </h5>
//                       <div className="row align-items-center">
//                         <div className="col-7">
//                           <h4 className="fw-semibold mb-3">36,358</h4>
//                           <div className="d-flex align-items-center mb-3">
//                             <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
//                               <FaArrowUp className="text-success" />
//                             </span>
//                             <p className="text-dark me-1 fs-3 mb-0">+9%</p>
//                             <p className="fs-3 mb-0">last year</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-12">
//                   <div className="card">
//                     <div className="card-body">
//                       <div className="row align-items-start">
//                         <div className="col-8">
//                           <h5 className="card-title mb-9 fw-semibold">
//                             <FaCalendarAlt className="me-2" /> Monthly Registration
//                           </h5>
//                           <h4 className="fw-semibold mb-3">6,820</h4>
//                           <div className="d-flex align-items-center pb-1">
//                             <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
//                               <FaArrowDown className="text-danger" />
//                             </span>
//                             <p className="text-dark me-1 fs-3 mb-0">+9%</p>
//                             <p className="fs-3 mb-0">last year</p>
//                           </div>
//                         </div>
//                         <div className="col-4">
//                           <div className="d-flex justify-content-end">
//                             <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
//                               <FaDollarSign className="fs-6" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="py-6 px-6 text-center">
//             <p className="mb-0 fs-4">
//               Developed in:{' '}
//               <a
//                 href="https://adminmart.com/"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="pe-1 text-primary text-decoration-underline"
//               >
//                 March 2025
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default withAuth(DashboardPage);




















"use client"; // Mark this as a client component if needed

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import {
  FaChartLine,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaTimesCircle,
  FaCertificate,
  FaDollarSign,
} from "react-icons/fa";

// Define types for the city data
interface City {
  city: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  hospital?: string; // Optional hospital name
}

type CityData = {
  [key: string]: [number, number, string][]; // Key is city name, value is an array of [latitude, longitude, hospitalName]
};

const cityData: CityData = {
  Karachi: [
    [24.8607, 67.0011, "Indus Hospital & Health Network"],
    [24.8800, 67.0500, "Fazale Illahi Hospital"],
    [24.9000, 67.0200, "Eastside Healthcare Pvt Ltd"],
    [24.8700, 67.0100, "Family Care Hospital"],
    [24.8900, 67.0300, "Karachi Medical Center"],
  ],
  Hyderabad: [
    [25.3792, 68.3683, "Hyderabad Medical Complex"],
    [25.3900, 68.3700, "Sindh Institute of Urology and Transplantation"],
    [25.4000, 68.3800, "Hyderabad General Hospital"],
    [25.3700, 68.3600, "Al-Mustafa Hospital"],
    [25.3800, 68.3650, "Sukkur Institute of Medical Sciences"],
  ],
  Sukkur: [
    [27.7000, 68.8667, "Sukkur Medical Center"],
    [27.7100, 68.8700, "Ghulam Muhammad Mahar Medical College"],
    [27.7200, 68.8800, "Sukkur Institute of Medical Sciences"],
    [27.6900, 68.8600, "Civil Hospital Sukkur"],
    [27.7050, 68.8650, "Sukkur Heart Hospital"],
  ],
  Larkana: [
    [27.5600, 68.2100, "Larkana Medical Center"],
    [27.5700, 68.2200, "Shaheed Mohtarma Benazir Bhutto Medical University"],
    [27.5800, 68.2300, "Larkana General Hospital"],
    [27.5500, 68.2000, "Civil Hospital Larkana"],
    [27.5650, 68.2150, "Larkana Eye Hospital"],
  ],
  "Mirpur Khas": [
    [25.5250, 69.0150, "Mirpur Khas Medical Center"],
    [25.5300, 69.0200, "Mirpur Khas General Hospital"],
    [25.5400, 69.0300, "Al-Shifa Hospital Mirpur Khas"],
    [25.5200, 69.0100, "Civil Hospital Mirpur Khas"],
    [25.5350, 69.0250, "Mirpur Khas Maternity Hospital"],
  ],
};

const cardData = [
  {
    title: "Registered",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-success",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "UnRegistered",
    value: "1,200",
    icon: <FaTimesCircle className="me-2" />,
    bgColor: "bg-danger",
    percentage: "+5%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "Licensed",
    value: "4,500",
    icon: <FaCertificate className="me-2" />,
    bgColor: "bg-warning",
    percentage: "+12%",
    percentageColor: "text-success",
    arrow: <FaArrowUp className="text-success" />,
  },
  {
    title: "Homeopathy",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-white",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "Tibb Matab",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-white",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "GP Clinic",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-white",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "Polyclinic",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-white",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "Consultant Clinic",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-white",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
  {
    title: "Dental Clinic",
    value: "6,820",
    icon: <FaCheckCircle className="me-2" />,
    bgColor: "bg-white",
    percentage: "+9%",
    percentageColor: "text-danger",
    arrow: <FaArrowDown className="text-danger" />,
  },
];

const markers = [
  { id: 1, position: { lat: 24.8607, lng: 67.0011 }, label: "Karachi", status: "Registered" },
  { id: 2, position: { lat: 25.3969, lng: 68.3778 }, label: "Hyderabad", status: "UnRegistered" },
  { id: 3, position: { lat: 27.7132, lng: 68.8483 }, label: "Sukkur", status: "Licensed" },
  { id: 4, position: { lat: 27.5588, lng: 68.212 }, label: "Larkana", status: "Registered" },
  { id: 5, position: { lat: 25.5269, lng: 69.0111 }, label: "Mirpur Khas", status: "UnRegistered" },
];

const Dashboard = () => {
  // const [cities, setCities] = useState<City[]>([]); // State to store transformed city data
  // const [selectedCity, setSelectedCity] = useState(""); // State to manage selected city
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedMarker, setSelectedMarker] = useState<typeof markers[number] | null>(null);

  // Transform cityData into the required format
  useEffect(() => {
    const transformedCities: City[] = [];
    const date = new Date(2024, 2, 17); // Start date: March 17, 2024

    for (const cityName in cityData) {
      if (cityData.hasOwnProperty(cityName)) {
        cityData[cityName].forEach(([latitude, longitude, hospital]) => {
          transformedCities.push({
            city: cityName,
            latitude,
            longitude,
            timestamp: date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            hospital,
          });
          date.setDate(date.getDate() + 1); // Increment date by 1 day
        });
      }
    }

    // setCities(transformedCities); // Update state with transformed data
  }, []);

  // Handle city filter change
  // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCity(event.target.value);
  // };

  // Filter cities based on selected city
  // const filteredCities = selectedCity
  //   ? cities.filter((city) => city.city === selectedCity)
  //   : cities;

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat: 26.9124, // Center of Sindh
    lng: 68.3036,
  };

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
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={7} center={center}>
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={marker.position}
                      title={marker.label}
                      icon={{
                        url: "/assets/images/logos/logo.png", // Replace with your image URL
                        scaledSize: new google.maps.Size(40, 40), // Adjust size as needed
                      }}
                      onClick={() => setSelectedMarker(marker)}
                    />
                  ))}
                  {selectedMarker && (
                    <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
                      <div>
                        <b>{selectedMarker.label}</b>
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

        {/* Render cards dynamically */}
        <div className="col-lg-12">
          <div className="row">
            {cardData.map((card, index) => (
              <div className="col-lg-4" key={index}>
                <div className={`card ${card.bgColor}`}>
                  <div className="card-body">
                    <div className="row align-items-start">
                      <div className="col-8">
                        <h5 className="card-title mb-9 fw-semibold">
                          {card.icon} {card.title}
                        </h5>
                        <h4 className="fw-semibold mb-3">{card.value}</h4>
                        <div className="d-flex align-items-center pb-1">
                          <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                            {card.arrow}
                          </span>
                          <p className={`text-dark me-1 fs-3 mb-0 ${card.percentageColor}`}>
                            {card.percentage}
                          </p>
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

   
        <div className="py-6 px-6 text-center">
          <p className="mb-0 fs-4">
            Developed in:{"syedwasifali"}
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
    // </div>
  );
};

export default Dashboard;











































// dynamic map fatching






// "use client"; // Mark this as a client component if needed

// import React, { JSX, useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { collection, getDocs, Timestamp } from "firebase/firestore";
// import { firestore } from "../lib/firebase-config"; // Adjust the path to your Firebase config

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

// // Dynamically import the MapContainer and related components with SSR disabled
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Popup),
//   { ssr: false }
// );
// // Define types for the city data
// interface City {
//   id: string;
//   city: string;
//   latitude: number;
//   longitude: number;
//   timestamp: Timestamp;
// }

// // Define types for the card data
// const formatTimestamp = (timestamp: Timestamp) => {
//   return timestamp.toDate().toLocaleString(); // Convert to a readable date string
// };
// interface CardData {
//   title: string;
//   value: string;
//   icon: JSX.Element;
//   bgColor: string;
//   percentage: string;
//   percentageColor: string;
//   arrow: JSX.Element;
// }

// const Dashboard: React.FC = () => {
//   const [cities, setCities] = useState<City[]>([]); // All cities fetched from Firestore
//   const [filteredCities, setFilteredCities] = useState<City[]>([]); // Filtered cities based on dropdown selection
//   const [selectedCity, setSelectedCity] = useState<string>(""); // Selected city in the dropdown

//   // Fetch data from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       const locationsRef = collection(firestore, "user_locations");
//       const locationsSnapshot = await getDocs(locationsRef);
//       const locationsData = locationsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as City[];
//       setCities(locationsData);
//       setFilteredCities(locationsData); // Initially, show all cities
//     };

//     fetchData();
//   }, []);

//   // Handle city filter change
//   const filterFacilities = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const city = event.target.value;
//     setSelectedCity(city);

//     if (city === "") {
//       setFilteredCities(cities); // Show all cities if no city is selected
//     } else {
//       const filtered = cities.filter((item) => item.city === city);
//       setFilteredCities(filtered); // Filter cities based on selection
//     }
//   };

//   // Card data (static for now)
//   const cardData: CardData[] = [
//     {
//       title: "Registered",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-success",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "UnRegistered",
//       value: "1,200",
//       icon: <FaTimesCircle className="me-2" />,
//       bgColor: "bg-danger",
//       percentage: "+5%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "Licensed",
//       value: "4,500",
//       icon: <FaCertificate className="me-2" />,
//       bgColor: "bg-warning",
//       percentage: "+12%",
//       percentageColor: "text-success",
//       arrow: <FaArrowUp className="text-success" />,
//     },
//     {
//       title: "Homeopathy",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-white",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "Tibb Matab",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-white",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "GP Clinic",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-white",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "Polyclinic",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-white",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "Consultant Clinic",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-white",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//     {
//       title: "Dental Clinic",
//       value: "6,820",
//       icon: <FaCheckCircle className="me-2" />,
//       bgColor: "bg-white",
//       percentage: "+9%",
//       percentageColor: "text-danger",
//       arrow: <FaArrowDown className="text-danger" />,
//     },
//   ];

//   return (
//     <div className="body-wrapper-inner">
//       <div className="container-fluid">
//         {/* Row 1 */}
//         <div className="row">
//           <div className="col-lg-12 d-flex align-items-stretch">
//             <div className="card w-100">
//               <div className="card-body">
//                 <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
//                   <div className="mb-3 mb-sm-0">
//                     <h5 className="card-title fw-semibold">Sindh Cities Map</h5>
//                   </div>
//                   <div>
//                     {/* Dropdown for Sindh Cities */}
//                     <select
//                       className="form-select"
//                       id="cityFilter"
//                       onChange={filterFacilities}
//                       value={selectedCity}
//                     >
//                       <option value="">Show All Sindh</option>
//                       {Array.from(new Set(cities.map((city) => city.city))).map(
//                         (city, index) => (
//                           <option key={index} value={city}>
//                             {city}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </div>
//                 </div>
//                 {/* Map container */}
//                 <div id="map" style={{ height: "300px", width: "100%" }}>
//                   <MapContainer
//                     center={[24.8607, 67.0011]}
//                     zoom={7}
//                     style={{ height: "100%", width: "100%" }}
//                   >
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     {filteredCities.map((city, index) => (
//                       <Marker
//                         key={index}
//                         position={[city.latitude, city.longitude]}
//                         icon={
//                           new L.Icon({
//                             iconUrl:
//                               "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//                             iconSize: [25, 41],
//                             iconAnchor: [12, 41],
//                             popupAnchor: [1, -34],
//                             shadowSize: [41, 41],
//                           })
//                         }
//                       >
//                         <Popup>
//                           <b>{city.city}</b> <br /> {formatTimestamp(city.timestamp)}
//                         </Popup>
//                       </Marker>
//                     ))}
//                   </MapContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Yearly Breakup and Monthly Earnings Cards */}
//           <div className="col-lg-12">
//             <div className="row">
//               {/* Yearly Breakup Card */}
//               <div className="col-lg-6">
//                 <div className="card overflow-hidden">
//                   <div className="card-body p-4">
//                     <h5 className="card-title mb-9 fw-semibold">
//                       <FaChartLine className="me-2" /> Yearly Registration Breakup
//                     </h5>
//                     <div className="row align-items-center">
//                       <div className="col-7">
//                         <h4 className="fw-semibold mb-3">36,358</h4>
//                         <div className="d-flex align-items-center mb-3">
//                           <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
//                             <FaArrowUp className="text-success" />
//                           </span>
//                           <p className="text-dark me-1 fs-3 mb-0">+9%</p>
//                           <p className="fs-3 mb-0">last year</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Monthly Earnings Card */}
//               <div className="col-lg-6">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="row align-items-start">
//                       <div className="col-8">
//                         <h5 className="card-title mb-9 fw-semibold">
//                           <FaCalendarAlt className="me-2" /> Monthly Registration
//                         </h5>
//                         <h4 className="fw-semibold mb-3">6,820</h4>
//                         <div className="d-flex align-items-center pb-1">
//                           <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
//                             <FaArrowDown className="text-danger" />
//                           </span>
//                           <p className="text-dark me-1 fs-3 mb-0">+9%</p>
//                           <p className="fs-3 mb-0">last year</p>
//                         </div>
//                       </div>
//                       <div className="col-4">
//                         <div className="d-flex justify-content-end">
//                           <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
//                             <FaDollarSign className="fs-6" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Render cards dynamically */}
//           <div className="col-lg-12">
//             <div className="row">
//               {cardData.map((card, index) => (
//                 <div className="col-lg-4" key={index}>
//                   <div className={`card ${card.bgColor}`}>
//                     <div className="card-body">
//                       <div className="row align-items-start">
//                         <div className="col-8">
//                           <h5 className="card-title mb-9 fw-semibold">
//                             {card.icon} {card.title}
//                           </h5>
//                           <h4 className="fw-semibold mb-3">{card.value}</h4>
//                           <div className="d-flex align-items-center pb-1">
//                             <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
//                               {card.arrow}
//                             </span>
//                             <p className={`text-dark me-1 fs-3 mb-0 ${card.percentageColor}`}>
//                               {card.percentage}
//                             </p>
//                             <p className="fs-3 mb-0">last year</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="py-6 px-6 text-center">
//           <p className="mb-0 fs-4">
//             Developed in:{" Syed Wasif Ali "}
//             <a
//               href="https://adminmart.com/"
//               target="_blank"
//               className="pe-1 text-primary text-decoration-underline"
//             >
//               March 2025
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



