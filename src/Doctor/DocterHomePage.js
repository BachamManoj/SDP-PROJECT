import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';

const DoctorHomePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorAndAppointments = async () => {
      try {
        const doctorResponse = await axios.get('http://localhost:9999/getDoctorDetails', { withCredentials: true });
        
        if (doctorResponse.data) {
          setDoctor(doctorResponse.data);
          const appointmentsResponse = await axios.get(`http://localhost:9999/getPatientAppointments/${doctorResponse.data.id}`);
          
          if (appointmentsResponse.data) {
           const appointmentsWithPatientInfo = appointmentsResponse.data.map((appointment) => {
              return {
                ...appointment,
                patientId: appointment.patient?.id || 'Unknown',
                patientFirstName: appointment.patient?.firstName || 'Unknown',
              };
            });
            setAppointments(appointmentsWithPatientInfo);
          }
        } else {
          setError('Doctor not found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching doctor or appointment details');
      }
    };

    fetchDoctorAndAppointments();
  }, []);

  return (
    <div className="dashboard-container d-flex">
      <DoctorDashboard />
      <div className="container" style={{ marginTop: '100px' }}>
        {error && <div className="alert alert-danger">{error}</div>}

        {doctor ? (
          <>
            <h2>Welcome, Dr. {doctor.name}</h2>
            <h3>Your Appointments:</h3>
            
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Patient ID</th>
                  <th scope="col">Patient First Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{appointment.patientId}</td>
                      <td>{appointment.patientFirstName}</td>
                      <td>{new Date(appointment.date).toLocaleDateString()}</td>
                      <td>{new Date(appointment.date).toLocaleTimeString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No appointments available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <div className="alert alert-warning">Loading doctor details...</div>
        )}
      </div>
    </div>
  );
};

export default DoctorHomePage;
