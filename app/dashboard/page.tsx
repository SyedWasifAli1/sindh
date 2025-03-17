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

import React from "react";
import {
  FaChartLine,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaCertificate,
} from "react-icons/fa";

// const cities = [
//   {
//     city: "Karachi",
//     latitude: 24.8243948,
//     longitude: 67.1177209,
//     timestamp: "March 17, 2024",
//   },
//   {
//     city: "Hyderabad",
//     latitude: 25.396891,
//     longitude: 68.377159,
//     timestamp: "March 18, 2024",
//   },
//   {
//     city: "Sukkur",
//     latitude: 27.713187,
//     longitude: 68.848594,
//     timestamp: "March 19, 2024",
//   },
//   // Add more cities as needed
// ];
  // Define card data in an array
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

const Dashboard = () => {
  return (
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        {/* Row 1 */}
        <div className="row">
          <div className="col-lg-12 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div className="mb-3 mb-sm-0">
                    <h5 className="card-title fw-semibold">Sindh Cities Map</h5>
                  </div>
                  <div>
                    {/* Dropdown for Sindh Cities */}
                    <select className="form-select" id="citySelect">
                      <option value="">Show All Sindh</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Sukkur">Sukkur</option>
                      <option value="Larkana">Larkana</option>
                      <option value="Mirpur Khas">Mirpur Khas</option>
                      {/* Add more cities as needed */}
                    </select>
                  </div>
                </div>
                {/* Map container */}
                <div id="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623549.635514968!2d66.59467796875001!3d26.912433600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c3d5e8b5d5d5d%3A0x5e2e5e2e5e2e5e2e!2sSindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1698765432109!5m2!1sen!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* Leaflet Map Script */}
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

          <div className="col-lg-12">
            <div className="row">
              {/* Render cards dynamically */}
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
            Developed in:{"Syed Wasif Ali "}
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
    </div>
  );
};

export default Dashboard;