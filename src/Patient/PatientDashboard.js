import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientDashboard.css';
import { Link } from 'react-router-dom';
import logo from '../images/Life1.png';
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
            <div className="dashboard-container" style={{ marginTop: '60px' }}> {/* Adjust margin to prevent overlap with navbar */}
                <div className="sidebar">
                    <div className="logo-container">
                        <img src={logo} alt="Hospital Logo" className="hospital-logo" />
                    </div>
                    {profileImage && (
                        <div className="profile-image-container">
                            <img src={profileImage} alt="Profile" className="profile-image" />
                        </div>
                    )}
                    <div className="navbar-center">
                        <Link className="navbar-item" to="/patientHomepage">Dashboard</Link>
                        <Link className="navbar-item" to="/bookAppointments">Book Appointment</Link>
                        <Link className="navbar-item" to="/billing">Billing</Link>
                        <Link className="navbar-item" to="/reports">Reports</Link>
                        <Link className="navbar-item" to="/support">Support</Link>
                        <Link className="navbar-item" to="/patientprofile">My Profile</Link>
                        <a className="navbar-item" href="#" onClick={handleLogout}>Logout</a> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
