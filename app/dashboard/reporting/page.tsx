// export default function reporting() {

//     return(
//   <>
//     <link rel="stylesheet" href="/assets/css/styles.min.css" />

//   <div className="body-wrapper-inner">
//         <div className="container-fluid">
//           {/*  Row 1 */}
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="report-filter">
//                 <h5 className="card-title fw-semibold">Filters</h5>
//                 <div className="row">
//                   <div className="col-md-3">
//                     <label htmlFor="dateRange" className="form-label">
//                       Date Range
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="dateRange"
//                       placeholder="Select Date Range"
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="citySelect" className="form-label">
//                       City
//                     </label>
//                     <select className="form-select" id="citySelect">
//                       <option value="">All Cities</option>
//                       <option value="Karachi">Karachi</option>
//                       <option value="Hyderabad">Hyderabad</option>
//                       <option value="Sukkur">Sukkur</option>
//                       <option value="Larkana">Larkana</option>
//                       <option value="Mirpur Khas">Mirpur Khas</option>
//                     </select>
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="reportType" className="form-label">
//                       Report Type
//                     </label>
//                     <select className="form-select" id="reportType">
//                       <option value="registration">Registration</option>
//                       <option value="facility">Facility</option>
//                       <option value="inspection">Inspection</option>
//                     </select>
//                   </div>
//                   <div className="col-md-3 d-flex align-items-end">
//                     <button className="btn btn-primary w-100">
//                       Generate Report
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/*  Row 2 */}
//           <div className="row">
//             <div className="col-lg-6">
//               <div className="chart-card">
//                 <h5 className="card-title fw-semibold">Registration Trends</h5>
//                 <div id="registrationChart" />
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="chart-card">
//                 <h5 className="card-title fw-semibold">
//                   Facility Distribution
//                 </h5>
//                 <div id="facilityChart" />
//               </div>
//             </div>
//           </div>
//           {/*  Row 3 */}
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="table-card">
//                 <h5 className="card-title fw-semibold">Detailed Report</h5>
//                 <div className="table-responsive">
//                   <table className="table table-striped">
//                     <thead>
//                       <tr>
//                         <th>City</th>
//                         <th>Facility Name</th>
//                         <th>Registration Date</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Karachi</td>
//                         <td>ABC Hospital</td>
//                         <td>2025-03-01</td>
//                         <td>
//                           <span className="badge bg-success">Registered</span>
//                         </td>
//                         <td>
//                           <button className="btn btn-sm btn-primary">
//                             View
//                           </button>
//                           <button className="btn btn-sm btn-danger">
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Hyderabad</td>
//                         <td>XYZ Clinic</td>
//                         <td>2025-03-15</td>
//                         <td>
//                           <span className="badge bg-warning">Pending</span>
//                         </td>
//                         <td>
//                           <button className="btn btn-sm btn-primary">
//                             View
//                           </button>
//                           <button className="btn btn-sm btn-danger">
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                       {/* Add more rows as needed */}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/*  Row 4 */}
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="d-flex justify-content-end">
//                 <button className="btn btn-secondary me-2">
//                   Export as PDF
//                 </button>
//                 <button className="btn btn-secondary">Export as Excel</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
// </>

//     );
// }

"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { firestore, collection, onSnapshot } from "../../lib/firebase-config";
import { format, getMonth } from 'date-fns';
import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Timestamp } from "firebase/firestore";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Facility {
  id: string;
  clinicName?: string;
  cityName?: string;
  clinictype?: string;
  status?: string;
  privateOwner?: string;
  createdDate?: Timestamp;
}

interface Filters {
  startDate: string;
  endDate: string;
  city: string;
  status: string;
  clinicType: string;
}

interface CountData {
  [key: string]: number;
}

const Reports = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    startDate: "",
    endDate: "",
    city: "",
    status: "",
    clinicType: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const facilitiesRef = collection(firestore, 'facility_selections');
  
    const unsubscribeFacilities = onSnapshot(facilitiesRef, (facilitiesSnapshot) => {
      const facilitiesData = facilitiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Facility[];
  
      const allowedStatuses = ["Licensed", "Registered", "Un-Registered", "Pending"];
      const filteredFacilities = facilitiesData.filter((facility) => 
        facility.status && allowedStatuses.includes(facility.status)
      );

      setFacilities(filteredFacilities);
      setLoading(false);
    });
  
    return () => unsubscribeFacilities();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  // const handleGenerateReport = async () => {
  //   try {
  //     const doc = new jsPDF();
      
  //     // Add title with filters
  //     doc.setFontSize(16);
  //     doc.setTextColor(40);
  //     doc.text('Facilities Report', 105, 15, { align: 'center' });
      
  //     doc.setFontSize(10);
  //     doc.text(`Filters: ${getAppliedFiltersText()}`, 105, 22, { align: 'center' });
      
  //     // Add charts
  //     const chart1Container = document.querySelector('#registrations-chart');
  //     const chart2Container = document.querySelector('#facility-chart');
      
  //     if (chart1Container && chart2Container) {
  //       const chart1SVG = chart1Container.querySelector('svg');
  //       const chart2SVG = chart2Container.querySelector('svg');
        
  //       if (chart1SVG && chart2SVG) {
  //         // Convert SVGs to canvas
  //         const chart1Canvas = await svgToCanvas(chart1SVG);
  //         const chart2Canvas = await svgToCanvas(chart2SVG);
          
  //         // Add first chart
  //         doc.addImage(chart1Canvas.toDataURL('image/png'), 'PNG', 15, 30, 180, 90);
          
  //         // Add second chart
  //         doc.addImage(chart2Canvas.toDataURL('image/png'), 'PNG', 15, 130, 180, 90);
  //       }
  //     }
      
  //     // Add table
  //     const headers = [['Owner', 'Facility Name', 'Facility Type', 'City', 'Status', 'Registration Date']];
  //     const data = filteredFacilities.map(facility => [
  //       facility.privateOwner || 'N/A',
  //       facility.clinicName || 'N/A',
  //       facility.clinictype || 'N/A',
  //       facility.cityName || 'N/A',
  //       facility.status || 'N/A',
  //       formatTimestamp(facility.createdDate)
  //     ]);

  //     (doc as any).autoTable({
  //       head: headers,
  //       body: data,
  //       startY: 230,
  //       styles: { fontSize: 8 },
  //       headStyles: { fillColor: [182, 19, 25] },
  //       margin: { top: 230 }
  //     });

  //     doc.save(`facilities_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     alert('Error generating PDF report. Please try again.');
  //   }
  // };

  // const svgToCanvas = async (svg: SVGElement): Promise<HTMLCanvasElement> => {
  //   return new Promise((resolve) => {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d')!;
  //     const data = new XMLSerializer().serializeToString(svg);
  //     const img = new Image();
      
  //     img.onload = () => {
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0);
  //       resolve(canvas);
  //     };
      
  //     img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)));
  //   });
  // };

  // const getAppliedFiltersText = () => {
  //   const filtersText = [];
  //   if (filters.startDate) filtersText.push(`From: ${format(new Date(filters.startDate), 'MMM dd, yyyy')}`);
  //   if (filters.endDate) filtersText.push(`To: ${format(new Date(filters.endDate), 'MMM dd, yyyy')}`);
  //   if (filters.city) filtersText.push(`City: ${filters.city}`);
  //   if (filters.status) filtersText.push(`Status: ${filters.status}`);
  //   if (filters.clinicType) filtersText.push(`Clinic Type: ${filters.clinicType}`);
    
  //   return filtersText.length > 0 ? filtersText.join(' | ') : 'All Filters';
  // };

  type TimestampType = string | number | { seconds: number } | undefined;

const formatTimestamp = (timestamp: TimestampType): string => {
  if (!timestamp) return 'N/A';

  try {
    if (typeof timestamp === 'object' && 'seconds' in timestamp) {
      return format(new Date(timestamp.seconds * 1000), 'MMM dd, yyyy');
    }
    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      return format(new Date(timestamp), 'MMM dd, yyyy');
    }
    return 'N/A';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};


  const getMonthName = (monthIndex: number) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthIndex];
  };

  const getRegistrationsByMonth = () => {
    const monthCounts = Array(12).fill(0);
    
    filteredFacilities.forEach(facility => {
      let date: Date | null = null;
      
      if (facility.createdDate?.seconds) {
        date = new Date(facility.createdDate.seconds * 1000);
      } else if (typeof facility.createdDate === 'string') {
        date = new Date(facility.createdDate);
      } else if (typeof facility.createdDate === 'number') {
        date = new Date(facility.createdDate);
      }
      
      if (date) {
        const month = getMonth(date);
        monthCounts[month]++;
      }
    });
    
    return {
      categories: Array.from({ length: 12 }, (_, i) => getMonthName(i)),
      data: monthCounts
    };
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredFacilities.map(facility => ({
        Owner: facility.privateOwner || 'N/A',
        'Facility Name': facility.clinicName || 'N/A',
        'Facility Type': facility.clinictype || 'N/A',
        City: facility.cityName || 'N/A',
        Status: facility.status || 'N/A',
        'Registration Date': formatTimestamp(facility.createdDate)
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facilities");
    XLSX.writeFile(workbook, "facilities_report.xlsx");
  };

  if (loading) {
    return <div>Loading facilities data...</div>;
  }

  // Filter facilities based on selected filters
  const filteredFacilities = facilities.filter(facility => {
    // Date filter
    if (filters.startDate || filters.endDate) {
      const regDate = facility.createdDate;
      if (!regDate) return false;
      
      let dateMillis;
      if (regDate.seconds) {
        dateMillis = regDate.seconds * 1000;
      } else if (typeof regDate === 'string') {
        dateMillis = new Date(regDate).getTime();
      } else if (typeof regDate === 'number') {
        dateMillis = regDate;
      } else {
        return false;
      }

      const startDate = filters.startDate ? new Date(filters.startDate).getTime() : 0;
      const endDate = filters.endDate ? new Date(filters.endDate).getTime() : Date.now();
      
      if (dateMillis < startDate || dateMillis > endDate) {
        return false;
      }
    }
    
    // City filter
    const matchesCity = filters.city ? 
      (facility.cityName || '').toLowerCase() === filters.city.toLowerCase() : true;
    
    // Status filter
    const matchesStatus = filters.status ? 
      facility.status === filters.status : true;
    
    // Clinic Type filter
    const matchesClinicType = filters.clinicType ? 
      (facility.clinictype || '').toLowerCase() === filters.clinicType.toLowerCase() : true;
    
    return matchesCity && matchesStatus && matchesClinicType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
  const paginatedFacilities = filteredFacilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chart data
  const registrationsByMonth = getRegistrationsByMonth();
  const filteredFacilityTypeCount = filteredFacilities.reduce<CountData>((acc, facility) => {
    const type = facility.clinictype || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Get unique values for filter dropdowns
  const cities = Array.from(
    new Set(facilities.map(f => f.cityName).filter((name): name is string => Boolean(name)))
  );
  
  const statuses = ["Licensed", "Registered", "Un-Registered", "Pending"];
  const clinicTypes = [
    "Dental Clinic",
    "Homeopathy Clinic",
    "Poly Clinic",
    "Consultant / Single Specialty Clinic",
    "GP Clinic",
    "TibbMatab Clinic"
  ];

  return (
    <>
      <div className="body-wrapper-inner">
        <div className="container-fluid">
          {/* Filters */}
          <div className="row">
            <div className="col-lg-12">
              <div className="report-filter">
                <h5 className="card-title fw-semibold">Filters</h5>
                <div className="row">
                  <div className="col-md-2">
                    <label className="form-label">From Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">To Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
                      name="city"
                      value={filters.city}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Statuses</option>
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Clinic Type</label>
                    <select
                      className="form-select"
                      name="clinicType"
                      value={filters.clinicType}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      {clinicTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button 
                      className="btn w-100" 
                      // onClick={}
                      style={{
                        backgroundColor: "#b61319",
                        color: "white",
                        fontWeight: "bold"
                      }}
                    >
                      Generate Report (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row pt-3">
            <div className="col-lg-6">
              <div className="chart-card">
                <h5 className="card-title fw-semibold">Monthly Registrations</h5>
                <Chart
                  options={{ 
                    chart: { 
                      id: "registrations-chart",
                      toolbar: {
                        show: true
                      }
                    },
                    xaxis: {
                      categories: registrationsByMonth.categories,
                      title: { text: "Months" }
                    },
                    yaxis: {
                      title: { text: "Number of Registrations" }
                    },
                    colors: ['#b61319'],
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: false,
                      }
                    },
                    dataLabels: { enabled: false }
                  }}
                  series={[{
                    name: "Registrations",
                    data: registrationsByMonth.data
                  }]}
                  type="bar"
                  height={300}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chart-card">
                <h5 className="card-title fw-semibold">Facility Types</h5>
                {/* <Chart
                  options={{ 
                    chart: { 
                      id: "facility-chart",
                      toolbar: {
                        show: true
                      }
                    }, 
                    labels: Object.keys(filteredFacilityTypeCount),
                    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
                  }}
                  series={Object.values(filteredFacilityTypeCount)}
                  type="pie"
                  height={300}
                /> */}

<Chart
  options={{ 
    chart: { 
      id: "facility-chart",
      toolbar: {
        show: true
      }
    },
    labels: Object.keys(filteredFacilityTypeCount),
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    dataLabels: {
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex]; // 👈 count dikhata hai
      }
    },
    legend: {
      formatter: function(seriesName, opts) {
        const count = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}: ${count}`; // 👈 legend me bhi count dikhayega
      }
    }
  }}
  series={Object.values(filteredFacilityTypeCount)}
  type="pie"
  height={300}
/>

              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="col-lg-12">
              <div className="table-card">
                <h5 className="card-title fw-semibold">Detailed Report</h5>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Owner</th>
                        <th>Facility Name</th>
                        <th>Facility Type</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Registration Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedFacilities.map((facility) => (
                        <tr key={facility.id}>
                          <td>{facility.privateOwner || 'N/A'}</td>
                          <td>{facility.clinicName || 'N/A'}</td>
                          <td>{facility.clinictype || 'N/A'}</td>
                          <td>{facility.cityName || 'N/A'}</td>
                          <td>
                            <span className={`badge ${
                              facility.status === 'Registered' ? 'bg-success' :
                              facility.status === 'Licensed' ? 'bg-primary' :
                              facility.status === 'Pending' ? 'bg-warning' : 'custom-red-bg'
                            }`}>
                              {facility.status}
                            </span>
                          </td>
                          <td>{formatTimestamp(facility.createdDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    Showing {paginatedFacilities.length} of {filteredFacilities.length} facilities
                  </div>
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-end mt-3">
                <button 
                  style={{
                    backgroundColor: "rgb(182, 19, 25)",
                    color: "white",
                    fontWeight: "bold"
                  }} 
                  className="btn" 
                  onClick={exportToExcel}
                >
                  Export as Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;