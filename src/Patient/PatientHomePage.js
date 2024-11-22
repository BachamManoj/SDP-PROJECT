import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientDashboard from './PatientDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientHomePage = () => {
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

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

                const currentDate = new Date();
                const upcomingAppointments = appointmentsRes.data.filter((appointment) =>
                    new Date(appointment.date) > currentDate
                );

                setAppointments(upcomingAppointments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching patient details or appointments:', error);
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, []);

    const fetchReport = (appointmentId, doctorId) => {
        console.log('Fetching report for appointment:', appointmentId, 'Doctor ID:', doctorId);
    };

    return (
        <div className="dashboard-container d-flex">
            <PatientDashboard />
            <div className="container" style={{ marginTop: '100px' }}>
                <h2 className="mb-4">Upcoming Appointments</h2>

                {loading && (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}

                {patient && (
                    <div className="alert alert-info">
                        <h4>Welcome, {patient.firstName} {patient.lastName}</h4>
                    </div>
                )}

                {!loading && appointments.length > 0 && (
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Appointment ID</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date</th>
                                <th>Time Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.doctor.name}</td>
                                    <td>{appointment.date}</td>
                                    <td>
                                    {appointment.timeSlot}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && appointments.length === 0 && (
                    <div className="alert alert-warning" role="alert">
                        No upcoming appointments found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientHomePage;
