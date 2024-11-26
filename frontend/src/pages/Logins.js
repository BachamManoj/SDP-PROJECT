import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Logins = () => {
  return (
    <div>
      <Navbar/>
    <div className="d-flex justify-content-center align-items-center vh-100">
      
      <div className="text-center p-5 bg-light rounded shadow" style={{ maxWidth: '900px', width: '100%' }}>
        <h1 className="mb-4">Login to Your Account</h1>
        <div className="row gx-4"> {/* Increased gap between columns */}
          <div className="col-lg-4 mb-4"> {/* Increased width on larger screens */}
            <div className="p-4 bg-info text-white rounded shadow h-100">
              <h2>Patient</h2>
              <p>Login to manage your health records and appointments.</p>
              <Link to="/patientlogin">
                <button className="btn btn-primary w-100 mt-3">Patient Login</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="p-4 bg-info text-white rounded shadow h-100">
              <h2>Doctor</h2>
              <p>Login to manage patient records and appointments.</p>
              <Link to="/doctorlogin">
                <button className="btn btn-primary w-100 mt-3">Doctor Login</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="p-4 bg-info text-white rounded shadow h-100">
              <h2>Pharmacist</h2>
              <p>Login to manage prescriptions</p>
              <Link to="/pharmacistlogin">
                <button className="btn btn-primary w-100 mt-3">Pharmacist Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Logins;
