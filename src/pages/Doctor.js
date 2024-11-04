import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Navbar from './Navbar';


const doctors = [
  // Cardiologists
  { name: "Dr. Rajesh Kumar", specialty: "Cardiologist", experience: "15 years" },
  { name: "Dr. Anjali Mehta", specialty: "Cardiologist", experience: "12 years" },
  { name: "Dr. Vikram Singh", specialty: "Cardiologist", experience: "20 years" },
  
  // Pediatricians
  { name: "Dr. Neha Sharma", specialty: "Pediatrician", experience: "10 years" },
  { name: "Dr. Karan Verma", specialty: "Pediatrician", experience: "8 years" },
  { name: "Dr. Priya Desai", specialty: "Pediatrician", experience: "14 years" },
  
  // Dermatologists
  { name: "Dr. Sita Reddy", specialty: "Dermatologist", experience: "9 years" },
  { name: "Dr. Amit Joshi", specialty: "Dermatologist", experience: "11 years" },
  { name: "Dr. Riya Patel", specialty: "Dermatologist", experience: "7 years" },
  
  // Orthopedics
  { name: "Dr. Sameer Gupta", specialty: "Orthopedic", experience: "13 years" },
  { name: "Dr. Pooja Rao", specialty: "Orthopedic", experience: "16 years" },
  { name: "Dr. Arjun Malhotra", specialty: "Orthopedic", experience: "10 years" },
  
  // Neurologists
  { name: "Dr. Anil Kapoor", specialty: "Neurologist", experience: "18 years" },
  { name: "Dr. Meena Iyer", specialty: "Neurologist", experience: "20 years" },
  { name: "Dr. Ravi Nair", specialty: "Neurologist", experience: "5 years" },
  
  // General Practitioners
  { name: "Dr. Suresh Rao", specialty: "General Practitioner", experience: "22 years" },
  { name: "Dr. Kavita Sharma", specialty: "General Practitioner", experience: "19 years" },
  { name: "Dr. Deepak Jain", specialty: "General Practitioner", experience: "14 years" },
  
  // Oncologists
  { name: "Dr. Nisha Gupta", specialty: "Oncologist", experience: "17 years" },
  { name: "Dr. Rohit Sen", specialty: "Oncologist", experience: "13 years" },
  { name: "Dr. Maya Singh", specialty: "Oncologist", experience: "9 years" },
  
  // Psychiatrists
  { name: "Dr. Rakesh Kumar", specialty: "Psychiatrist", experience: "10 years" },
  { name: "Dr. Sneha Banerjee", specialty: "Psychiatrist", experience: "6 years" },
  { name: "Dr. Ankit Mehra", specialty: "Psychiatrist", experience: "8 years" },
];

const DoctorsBySpecialty = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("Cardiologist");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = doctors.filter(
    doctor => doctor.specialty === selectedSpecialty
  );

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))].sort();

  const handleAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="container mt-5">
      <Navbar/>
      <h1 className="text-center mb-4">Select a Doctor by Specialty</h1>
      
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text"><strong>Specialty:</strong> {doctor.specialty}</p>
                  <p className="card-text"><strong>Experience:</strong> {doctor.experience}</p>
                  <div className="mt-auto">
                    <Button variant="primary" onClick={() => handleAppointment(doctor)}>
                      Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No doctors available for this specialty.</p>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book an Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor ? (
            <>
              <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
              <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
              <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
              <p>Please contact the clinic to schedule your appointment.</p>
            </>
          ) : (
            <p>No doctor selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => alert('Appointment booked!')}>
            Confirm Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorsBySpecialty;
