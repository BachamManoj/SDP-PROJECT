import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import PatientDashboard from './PatientDashboard';
import './Appointment.css';

const Appointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [speciality, setSpeciality] = useState("");
    const [patient, setPatient] = useState({});
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [generatedSlots, setGeneratedSlots] = useState([]);
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const initializeData = async () => {
            try {
                const patientResponse = await axios.get('http://localhost:9999/getPatientDetails', { withCredentials: true });
                setPatient(patientResponse.data);

                const bookedDatesResponse = await axios.get(
                    `http://localhost:9999/getAlreadybookedDates/${patientResponse.data.id}`
                );
                const formattedDates = bookedDatesResponse.data.map(date => new Date(date).toLocaleDateString('en-CA'));
                setBookedDates(formattedDates);

                generateTimeSlots();
            } catch (error) {
                console.error("Error initializing data:", error);
                displaySessionExpiredMessage();
            }
        };

        initializeData();
    }, []);

    const displaySessionExpiredMessage = () => {
        alert("Your session has expired. Please log in again.");
        navigate('/login');
    };

    const generateTimeSlots = () => {
        const slots = [];
        let start = new Date();
        start.setHours(9, 0, 0, 0);
        const end = new Date();
        end.setHours(17, 0, 0, 0);

        while (start < end) {
            slots.push(
                new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
            );
            start.setMinutes(start.getMinutes() + 30);
        }
        setGeneratedSlots(slots);
        setAvailableSlots(slots);
    };

    const fetchDoctorsBySpecialty = useCallback(async () => {
        if (!speciality) return;

        try {
            const response = await axios.post(
                'http://localhost:9999/getbyspecialty',
                speciality,
                { headers: { 'Content-Type': 'text/plain' } }
            );
            setDoctors(response.data);
            setSelectedDoctor(null);
        } catch (error) {
            console.error("Error fetching doctor details:", error);
            setDoctors([]);
        }
    }, [speciality]);

    useEffect(() => {
        fetchDoctorsBySpecialty();
    }, [speciality, fetchDoctorsBySpecialty]);

    const fetchBookedSlots = useCallback(async () => {
        if (!selectedDoctor || !selectedDate) return;

        try {
            const formattedDate = selectedDate.toLocaleDateString('en-CA');
            const response = await axios.get(
                `http://localhost:9999/getDoctorFreeSlot/${selectedDoctor.id}/${formattedDate}`
            );     
            filterAvailableSlots(response.data);
        } catch (error) {
            console.error("Error fetching booked slots:", error);
        }
    }, [selectedDoctor, selectedDate]);

    useEffect(() => {
        fetchBookedSlots();
    }, [selectedDoctor, selectedDate, fetchBookedSlots]);

    const filterAvailableSlots = (booked) => {
        const trimmedGeneratedSlots = generatedSlots.map(slot => slot.slice(0, 5));
        const trimmedBookedSlots = booked.map(slot => slot.slice(0, 5));
        const remainingSlots = trimmedGeneratedSlots.filter(slot => !trimmedBookedSlots.includes(slot));
    
        setAvailableSlots(remainingSlots);
    };

    const handleSpecialtyChange = (e) => {
        setSpeciality(e.target.value);
    };

    const handleDoctorChange = (e) => {
        const doctorId = parseInt(e.target.value, 10);
        const selected = doctors.find(doctor => doctor.id === doctorId);
        setSelectedDoctor(selected);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime("");
    };

    const handleAppointmentSubmit = async () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            alert("Please select a date, doctor, and time slot.");
            return;
        }

        try {
            const formattedDate = selectedDate.toLocaleDateString('en-CA');
            const appointmentData = {
                patient: patient,
                doctor: selectedDoctor,
                date: formattedDate,
                timeSlot: selectedTime,
            };

            const response = await axios.post('http://localhost:9999/makeAppointment', appointmentData);
            alert(response.data || "Appointment successfully created!");
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

    const isDateDisabled = (date) => {
        const formattedDate = date.toLocaleDateString('en-CA');
        return bookedDates.includes(formattedDate);
    };

    return (
        <div className="appointment-container">
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
                        <ReactDatePicker
                            id="date"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            filterDate={(date) => !isDateDisabled(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                            wrapperClassName="w-100"
                            popperClassName="custom-popper"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="timeSlot" className="form-label">Select a Time Slot:</label>
                        <select
                            id="timeSlot"
                            className="form-select"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            disabled={!selectedDate || availableSlots.length === 0}
                        >
                            <option value="">Choose a time slot</option>
                            {availableSlots.map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
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
