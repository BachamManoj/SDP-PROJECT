import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientDashboard.css';
import { Link } from 'react-router-dom';

import PatientMain from './PatientMain';

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const res = await axios.get('http://localhost:9999/getPatientDetails', {
                    withCredentials: true,
                });
                setPatient(res.data);

                const imageRes = await axios.get(`http://localhost:9999/profile/${res.data.id}/image`, {
                    responseType: 'blob',
                    withCredentials: true,
                });
                setProfileImage(URL.createObjectURL(imageRes.data));
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        fetchPatientDetails();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:9999/logout', {}, { withCredentials: true });
            setPatient(null);
            setProfileImage(null);
            alert("Logged out successfully.");
            window.location.href = '/login'; 
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            <PatientMain />
            <div className="custom-dashboard-container">
                <div className="custom-sidebar1" style={{backgroundColor:'#bef8fd'}}>
                    
                    {profileImage && (
                        <div className="custom-profile-image-container">
                            <img src={profileImage} alt="Profile" className="custom-profile-image" />
                        </div>
                    )}
                    <div className="custom-navbar-center">
                        <Link className="custom-navbar-item" to="/patientHomepage">Dashboard</Link>
                        <Link className="custom-navbar-item" to="/bookAppointments">Book Appointment</Link>
                        <Link className="custom-navbar-item" to="/myAppointments">MyAppointment</Link>
                        <Link className="custom-navbar-item" to="/MyEPrescription">EPrescription</Link>
                        <Link className="custom-navbar-item" to="/billing">Billing</Link>
                        <Link className="custom-navbar-item" to="/patientRecordsbyPatient">Reports</Link>
                        <Link className="custom-navbar-item" to="/myOrdersByPatient">My Orders</Link>
                        <Link className="custom-navbar-item" to="/patientprofile">My Profile</Link>   
                        <a className="custom-navbar-item" href="#" onClick={handleLogout}>Logout</a> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
