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
  const [selectedDoctorEmail, setSelectedDoctorEmail] = useState(null); 
  const [ratings, setRatings] = useState({}); 
  const [ratingDescriptions, setRatingDescriptions] = useState({}); 

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.get('http://localhost:9999/getPatientDetails', {
          withCredentials: true,
        });
        setPatientId(res.data.id);
      } catch (error) {
        setError('Error fetching patient details. Please try again later.');
        console.error('Error fetching patient details:', error);
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
          const response = await axios.get(
            `http://localhost:9999/getappointments/${patientId}`
          );
          setAppointments(response.data || []);
        } catch (error) {
          setError('Error fetching appointments. Please try again later.');
          console.error('Error fetching appointments:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }
  }, [patientId]);

  const handleChatOpen = (doctorEmail) => {
    setSelectedDoctorEmail(doctorEmail);
  };

  const handleRatingSubmit = async (appointmentId) => {
    try {
      const rating = ratings[appointmentId];
      const ratingDescription = ratingDescriptions[appointmentId];

      if (!rating || rating < 1 || rating > 5) {
        alert('Please provide a valid rating between 1 and 5.');
        return;
      }
      if (!ratingDescription) {
        alert('Please provide a description for your rating.');
        return;
      }

      await axios.put(
        `http://localhost:9999/ratebyPatient/${appointmentId}`,
        {
          rating: parseInt(rating, 10),
          ratingDescription: ratingDescription.trim(),
        },
        { withCredentials: true }
      );

      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(error.response?.data || 'Error submitting rating');
    }
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
                  <th>Status</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{appointment.doctor.name}</td>
                    <td>
                      {new Date(appointment.date).toLocaleDateString('en-GB')}
                    </td>
                    <td>{appointment.timeSlot}</td>
                    <td>
                      {appointment.isCompleted ? (
                        <span className="badge bg-success">Yes</span>
                      ) : (
                        <span className="badge bg-danger">No</span>
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
                    <td>{appointment.status}</td>
                    <td>
                      {appointment.isCompleted && !appointment.rating ? (
                        <div>
                          <input
                            type="number"
                            value={ratings[appointment.id] || ''}
                            onChange={(e) =>
                              setRatings({
                                ...ratings,
                                [appointment.id]: e.target.value,
                              })
                            }
                            min="1"
                            max="5"
                            placeholder="Rate (1-5)"
                            className="form-control"
                          />
                          <textarea
                            value={ratingDescriptions[appointment.id] || ''}
                            onChange={(e) =>
                              setRatingDescriptions({
                                ...ratingDescriptions,
                                [appointment.id]: e.target.value,
                              })
                            }
                            placeholder="Describe your rating"
                            className="form-control mt-2"
                          />
                          <button
                            className="btn btn-primary mt-2"
                            onClick={() => handleRatingSubmit(appointment.id)}
                          >
                            Submit Rating
                          </button>
                        </div>
                      ) : (
                        <span>{appointment.rating || 'Not Rated'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedDoctorEmail && <Chat user2={selectedDoctorEmail} />}
    </div>
  );
};

export default MyAppointments;
