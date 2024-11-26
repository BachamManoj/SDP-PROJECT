import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; 
import logo from '../images/Life1.png'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navigation" id="navbar" >
        <div className="container">
          <Link className="nav-link" to="/">
            <img src={logo} alt="" className="img-fluid"  />
          </Link>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarmain" aria-controls="navbarmain" aria-expanded="false" aria-label="Toggle navigation">
            <span className="icofont-navigation-menu"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarmain">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/service">Services</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="department.html" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Department <i className="icofont-thin-down"></i></a>
                <ul className="dropdown-menu" aria-labelledby="dropdown02">
                  <li><a className="dropdown-item" href="department.html">Departments</a></li>
                  <li><a className="dropdown-item" href="department-single.html">Department Single</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="doctor.html" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Doctors <i className="icofont-thin-down"></i></a>
                <ul className="dropdown-menu" aria-labelledby="dropdown03">
                  <li><Link className="nav-link" to="/doctor">Doctor</Link></li>
                  {/* <li><a className="dropdown-item" href="doctor-single.html">Doctor Single</a></li> */}
                  <li><Link className="nav-link" to="/appointment">Appointment</Link></li>
                </ul>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/chat">Chating</Link></li>
            </ul>
          </div>
          
        </div>
      </nav>
    </header>
  );
}
