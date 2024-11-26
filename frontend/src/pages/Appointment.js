

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Appointment = ({ show, handleClose, doctor }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointmentDate && appointmentTime) {
      alert(`Appointment booked with ${doctor.name} on ${appointmentDate} at ${appointmentTime}`);
      handleClose();
      
    } else {
      alert('Please select both date and time for your appointment.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {doctor ? (
          <>
            <p><strong>Doctor:</strong> {doctor.name}</p>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTime">
                <Form.Label>Appointment Time</Form.Label>
                <Form.Control
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Confirm Appointment
              </Button>
            </Form>
          </>
        ) : (
          <p>No doctor selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Appointment;
