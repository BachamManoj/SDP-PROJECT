import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import PatientDashboard from './PatientDashboard';
import './Chat.css';

const Chat = () => {
    const [patientData, setPatientData] = useState({ email: '' });
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const receiver = 'manojbac@gmail.com'; // The receiver's email

    // Fetch Patient data and chat history
    const fetchPatientData = async () => {
        try {
            const res = await axios.get('http://localhost:9999/getPatientDetails', { withCredentials: true });
            setPatientData(res.data);

            const response = await axios.get('http://localhost:9999/api/chat/history', {
                params: { sender: res.data.email, receiver },
                withCredentials: true,
            });
            setMessages(response.data);
        } catch (err) {
            console.error("Failed to fetch patient data or chat history:", err);
        }
    };

    // Fetch patient data and chat history on initial load and every 10 seconds
    useEffect(() => {
        fetchPatientData(); // Initial fetch

        // Set interval to refresh chat history every 10 seconds
        const intervalId = setInterval(fetchPatientData, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [receiver]);

    // Establish WebSocket connection for real-time messaging
    useEffect(() => {
        const socket = new SockJS('http://localhost:9999/ws');
        const client = Stomp.over(socket);
    
        client.connect({}, () => {
            client.subscribe(`/user/queue/messages`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                if (
                    (receivedMessage.sender === patientData.email && receivedMessage.receiver === receiver) ||
                    (receivedMessage.sender === receiver && receivedMessage.receiver === patientData.email)
                ) {
                    setMessages(prevMessages => [...prevMessages, receivedMessage]);
                }
            });
            setStompClient(client);
        });
    
        // Clean up when the component is unmounted
        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [patientData.email, receiver]);
    

    // Handle sending messages
    const sendMessage = () => {
        if (stompClient && inputMessage.trim() && patientData.email) {
            const message = {
                sender: patientData.email,
                receiver,
                content: inputMessage,
                timestamp: new Date().toISOString(),
            };
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
            setInputMessage('');
            setMessages(prevMessages => [...prevMessages, message]); // Add to local state immediately
        }
    };

    return (
        <div className="chat-dashboard-container">
            <PatientDashboard />
            <div className="chat-main">
                <div className="chat-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-bubble ${msg.sender === patientData.email ? 'sent' : 'received'}`}
                        >
                            <span className="message-content">{msg.content}</span>
                            <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
