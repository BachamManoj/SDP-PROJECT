import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PatientDashboard from './PatientDashboard';

const MyEPrescription = () => {
  const [ePrescriptions, setEPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:9999/getPatientDetails', {
          withCredentials: true,
        });

        if (response.data && response.data.id) {
          setPatientId(response.data.id);
        } else {
          setError('Patient details not found.');
        }
      } catch (error) {
        setError('Error fetching patient details.');
        console.error(error);
      }
    };

    fetchPatientDetails();
  }, []);

  useEffect(() => {
    if (patientId) {
      const fetchEPrescriptions = async () => {
        try {
          const response = await axios.get(`http://localhost:9999/viewMyEPrescriptionByPatient/${patientId}`, {
            withCredentials: true,
          });

          if (response.data) {
            setEPrescriptions(response.data);
          }
        } catch (error) {
          setError('Error fetching ePrescriptions.');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchEPrescriptions();
    }
  }, [patientId]);

  const handleAcceptAndPay = async (appointmentId) => {
    try {
      const response = await axios.get(`http://localhost:9999/acceptandgetEPrescriptionPrice/${appointmentId}`, {
        withCredentials: true,
      });

      if (response.data) {
        const paymentAmount = response.data;
        navigate(`/billing`, { state: { appointmentId, paymentAmount } });
      }
    } catch (error) {
      setError('Error processing payment.');
      console.error(error);
    }
  };

  const renderEPrescriptions = () => {
    if (ePrescriptions.length === 0) {
      return <div>No e-prescriptions found for this patient.</div>;
    }

    const groupedByAppointment = ePrescriptions.reduce((acc, ePrescription) => {
      const { appointment } = ePrescription;
      const appointmentId = appointment.id;
      if (!acc[appointmentId]) {
        acc[appointmentId] = [];
      }
      acc[appointmentId].push(ePrescription);
      return acc;
    }, {});

    return Object.keys(groupedByAppointment).map((appointmentId) => {
      const appointment = groupedByAppointment[appointmentId][0].appointment;
      const allNotAccepted = groupedByAppointment[appointmentId].every(
        (ePrescription) => !ePrescription.accept
      );

      return (
        <div key={appointmentId} className="ePrescription-group mb-4">
          <h4>Appointment ID: {appointmentId}</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Medicine Name</th>
                <th scope="col">Doctor</th>
                <th scope="col">Quantity</th>
                <th scope="col">Description</th>
                <th scope="col">Issued On</th>
              </tr>
            </thead>
            <tbody>
              {groupedByAppointment[appointmentId].map((ePrescription, index) => (
                <tr key={index}>
                  <td>{ePrescription.medicineName}</td>
                  <td>{ePrescription.doctor.name}</td>
                  <td>{ePrescription.quantity}</td>
                  <td>{ePrescription.description}</td>
                  <td>{new Date(ePrescription.appointment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointment.isCompleted && (
            <div className="text-center">
              {allNotAccepted ? (
                <button
                  className="btn btn-success"
                  onClick={() => handleAcceptAndPay(appointmentId)}
                >
                  Accept and Pay
                </button>
              ) : (
                <button className="btn btn-secondary" disabled>
                  Already Accepted
                </button>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="dashboard-container d-flex">
      <PatientDashboard />
      <div className="container">
        <h2 className="text-center mb-4">My ePrescriptions</h2>

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
        ) : (
          renderEPrescriptions()
        )}
      </div>
    </div>
  );
};

export default MyEPrescription;
