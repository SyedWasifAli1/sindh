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
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Reports = () => {
  const [filters, setFilters] = useState({
    dateRange: "",
    city: "",
    reportType: "registration",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = () => {
    console.log("Generating Report with:", filters);
  };

  return (
    <>
      {/* <link rel="stylesheet" href="/assets/css/styles.min.css" /> */}
      <div className="body-wrapper-inner">
        <div className="container-fluid">
          {/* Filters */}
          <div className="row">
            <div className="col-lg-12">
              <div className="report-filter">
                <h5 className="card-title fw-semibold">Filters</h5>
                <div className="row">
                  <div className="col-md-3">
                    <label className="form-label">Date Range</label>
                    <input
                      type="text"
                      className="form-control"
                      name="dateRange"
                      placeholder="Select Date Range"
                      value={filters.dateRange}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
                      name="city"
                      value={filters.city}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Cities</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Sukkur">Sukkur</option>
                      <option value="Larkana">Larkana</option>
                      <option value="Mirpur Khas">Mirpur Khas</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Report Type</label>
                    <select
                      className="form-select"
                      name="reportType"
                      value={filters.reportType}
                      onChange={handleFilterChange}
                    >
                      <option value="registration">Registration</option>
                      <option value="facility">Facility</option>
                      <option value="inspection">Inspection</option>
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={handleGenerateReport}>
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row">
            <div className="col-lg-6">
              <div className="chart-card">
                <h5 className="card-title fw-semibold">Registration Trends</h5>
                <Chart
                  options={{ chart: { id: "registration-chart" }, xaxis: { categories: ["Jan", "Feb", "Mar"] } }}
                  series={[{ name: "Registrations", data: [30, 50, 80] }]}
                  type="bar"
                  height={300}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chart-card">
                <h5 className="card-title fw-semibold">Facility Distribution</h5>
                <Chart
                  options={{ chart: { id: "facility-chart" }, labels: ["Hospitals", "Clinics", "Labs"] }}
                  series={[40, 30, 30]}
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
                        <th>City</th>
                        <th>Facility Name</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Karachi</td>
                        <td>ABC Hospital</td>
                        <td>2025-03-01</td>
                        <td><span className="badge bg-success">Registered</span></td>
                        <td>
                          <button className="btn btn-sm btn-primary">View</button>
                          <button className="btn btn-sm btn-danger">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Hyderabad</td>
                        <td>XYZ Clinic</td>
                        <td>2025-03-15</td>
                        <td><span className="badge bg-warning">Pending</span></td>
                        <td>
                          <button className="btn btn-sm btn-primary">View</button>
                          <button className="btn btn-sm btn-danger">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2">Export as PDF</button>
                <button className="btn btn-secondary">Export as Excel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;