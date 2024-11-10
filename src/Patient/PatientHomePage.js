import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientDashboard from './PatientDashboard';
import './PatientHomePage.css'; // Ensure you import the CSS

const PatientHomePage = () => {
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const res = await axios.get('http://localhost:9999/getPatientDetails', {
                    withCredentials: true,
                });
                setPatient(res.data);

                const appointmentsRes = await axios.get(`http://localhost:9999/getappointments/${res.data.id}`, {
                    withCredentials: true,
                });
                setAppointments(appointmentsRes.data);
            } catch (error) {
                console.error("Error fetching patient details or appointments:", error);
            }
        };

        fetchPatientDetails();
    }, []);

    return (
        <div className="patient-home-page-container">
            <PatientDashboard />
            <div className="patient-home-page" style={{ marginTop: '60px' }}> {/* Adjust margin to avoid overlap */}
                {patient && (
                    <h1>Welcome, {patient.firstName} {patient.lastName}!</h1>
                )}
                <h2>Your Appointments</h2>
                {appointments.length > 0 ? (
                    <ul className="appointments-list">
                        {appointments.map((appointment) => (
                            <li key={appointment.id}>
                                <strong>Date:</strong> {appointment.date} | 
                                <strong> Time Slot:</strong> {appointment.timeSlot} | 
                                <strong> Doctor:</strong> {appointment.doctor.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No appointments scheduled.</p>
                )}
            </div>
        </div>
    );
};

export default PatientHomePage;
