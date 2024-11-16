import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorDashboard from './DoctorDashboard';  // Assuming you have a DoctorDashboard component for navigation
import DoctorChat from './DoctorChat';

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatientEmail, setSelectedPatientEmail] = useState(null); // State to track selected patient for chat

  // Fetch doctor details and then fetch patients' appointments using doctor's ID
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doctorResponse = await axios.get('http://localhost:9999/getDoctorDetails', {
          withCredentials: true,
        });

        if (doctorResponse.data) {
          setDoctor(doctorResponse.data);
          const appointmentsResponse = await axios.get(`http://localhost:9999/getPatientAppointments/${doctorResponse.data.id}`);
          if (appointmentsResponse.data) {
            setPatients(appointmentsResponse.data);
          } else {
            setPatients([]);
          }
        }
      } catch (error) {
        setError('Error fetching doctor details or patients\' appointments. Please try again later.');
        console.error("Error fetching doctor details or appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleChatClick = (email) => {
    setSelectedPatientEmail(email);  // Set selected patient email for chat
  };

  return (
    <div className="dashboard-container d-flex" style={{ height: '100vh' }}>
      <DoctorDashboard />
      <div className="container" style={{ marginTop: 100, flex: 1 }}>
        <h2 className="text-center mb-4">My Patients</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : patients.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No patients found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Patient Name</th>
                  <th>Appointment Date</th>
                  <th>Time Slot</th>
                  <th>Virtual Appointment</th>
                  <th>Post Queries</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.patient.firstName}</td>
                    <td>{new Date(patient.date).toLocaleDateString('en-CA')}</td>
                    <td>{patient.timeSlot}</td>
                    <td>No</td>
                    <td>
                      <button
                        className="btn btn-link ml-2"
                        onClick={() => handleChatClick(patient.patient.email)}  // When button clicked, set the selected patient email
                      >
                        Chat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Render DoctorChat component on the right side, filling the full height */}
      {selectedPatientEmail && (
  <div style={{ flex: 0.55, minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column' }}>
    <DoctorChat receiver={selectedPatientEmail} />
  </div>
)}

    </div>
  );
};

export default MyPatients;
