import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientDashboard from './PatientDashboard';
import './Appointment.css';

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [speciality, setSpeciality] = useState("");
    const [patient, setPatient] = useState({});
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const res = await axios.get('http://localhost:9999/getPatientDetails', { withCredentials: true });
                setPatient(res.data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        fetchPatientDetails();
        generateTimeSlots();
    }, []);

    useEffect(() => {
        if (speciality) {
            fetchDoctorsBySpecialty();
        }
    }, [speciality]);

    const fetchDoctorsBySpecialty = async () => {
        try {
            const res = await axios.post('http://localhost:9999/getbyspecialty', speciality, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            setDoctors(res.data);
            setSelectedDoctor(null);
        } catch (error) {
            console.error("Error fetching doctor details:", error);
            setDoctors([]);
        }
    };

    const generateTimeSlots = () => {
        const slots = [];
        let start = new Date();
        start.setHours(9, 0, 0, 0);
        const end = new Date();
        end.setHours(17, 0, 0, 0);

        while (start < end) {
            slots.push(new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
            start.setMinutes(start.getMinutes() + 30);
        }
        setAvailableSlots(slots);
    };

    const handleSpecialtyChange = (e) => {
        setSpeciality(e.target.value);
    };

    const handleDoctorChange = (e) => {
        const doctorId = parseInt(e.target.value, 10);
        const selected = doctors.find(doctor => doctor.id === doctorId);
        setSelectedDoctor(selected);
    };

    const handleAppointmentSubmit = async () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            alert("Please select a date, doctor, and time slot.");
            return;
        }

        try {
            const appointmentData = {
                patient: patient,
                doctor: selectedDoctor,
                date: selectedDate,
                timeSlot: selectedTime,
            };

            const res = await axios.post('http://localhost:9999/makeAppointment', appointmentData);

            alert(res.data || "Appointment successfully created!");

        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Failed to create appointment.");
        }
    };

    const specialties = [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Dermatology" },
        { id: 3, name: "Neurology" },
        { id: 4, name: "Pediatrics" },
        { id: 5, name: "Orthopedics" },
    ];

    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    return (
        <div className="appointment-container ">
            <div className="appointment-sidebar">
                <PatientDashboard />
            </div>
            <div className="appointment-main-content">
                <h2>Book an Appointment</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="specialty" className="form-label">Select Specialty:</label>
                        <select 
                            id="specialty" 
                            className="form-select" 
                            value={speciality} 
                            onChange={handleSpecialtyChange}
                        >
                            <option value="">Choose a specialty</option>
                            {specialties.map((spec) => (
                                <option key={spec.id} value={spec.name}>{spec.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="doctor" className="form-label">Select a Doctor:</label>
                        <select 
                            id="doctor" 
                            className="form-select" 
                            onChange={handleDoctorChange}
                            disabled={doctors.length === 0}
                        >
                            <option value="">Choose a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="date" className="form-label">Select a Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            className="form-control"
                            min={todayDate}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="timeSlot" className="form-label">Select a Time Slot:</label>
                        <select 
                            id="timeSlot" 
                            className="form-select" 
                            value={selectedTime} 
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            <option value="">Choose a time slot</option>
                            {availableSlots.map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button 
                    onClick={handleAppointmentSubmit} 
                    className="btn btn-primary"
                    disabled={!selectedDate || !selectedTime || !selectedDoctor}
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default Appointment;
