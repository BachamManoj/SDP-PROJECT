import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientDashboard from './PatientDashboard';
import Chat from './Chat';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctorEmail, setSelectedDoctorEmail] = useState(null); // Track the selected doctor's email for chat

  // Fetch patient details and then fetch appointments using patientId
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.get('http://localhost:9999/getPatientDetails', {
          withCredentials: true,
        });
        setPatientId(res.data.id); // Assuming the patient details contain an 'id' field
      } catch (error) {
        setError('Error fetching patient details. Please try again later.');
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  useEffect(() => {
    if (patientId) {
      const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`http://localhost:9999/getappointments/${patientId}`);
          if (response.data) {
            setAppointments(response.data);
          } else {
            setAppointments([]);
          }
        } catch (error) {
          setError('Error fetching appointments. Please try again later.');
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }
  }, [patientId]);

  const handleChatOpen = (doctorEmail) => {
    setSelectedDoctorEmail(doctorEmail); // Set the selected doctor's email
  };

  return (
    <div className="dashboard-container d-flex">
      <PatientDashboard />
      <div className="container" style={{ marginTop: 100 }}>
        <h2 className="text-center mb-4">My Appointments</h2>

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
        ) : appointments.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No appointments found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Virtual Appointment</th>
                  <th>Post Queries</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{appointment.doctor.name}</td>
                    <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
                    <td>{appointment.timeSlot}</td>
                    <td>
                      {appointment.isVirtual ? (
                        <span className="badge badge-success">Yes</span>
                      ) : (
                        <span className="badge badge-danger">No</span>
                      )}
                    </td>
                    <td>
                     <button
                                className="btn btn-link ml-2"
                                onClick={() => handleChatOpen(appointment.doctor.email)}
                              >
                                Chat with Doctor
                              </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Render Chat component if a doctor is selected */}
      {selectedDoctorEmail && <Chat user2={selectedDoctorEmail} />}
    </div>
  );
};

export default MyAppointments;
