import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import './DoctorChat.css';
import DoctorDashboard from './DoctorDashboard';

const DoctorChat = ({ receiver }) => {  // receiver as a prop
    const [doctorData, setDoctorData] = useState({ email: '' });
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    // Fetch Doctor data and chat history
    const fetchDoctorData = async () => {
        try {
            const res = await axios.get('http://localhost:9999/getDoctorDetails', { withCredentials: true });
            setDoctorData(res.data);

            const response = await axios.get('http://localhost:9999/api/chat/history', {
                params: { sender: res.data.email, receiver },
                withCredentials: true,
            });
            setMessages(response.data);
        } catch (err) {
            console.error("Failed to fetch doctor data or chat history:", err);
        }
    };

    // Fetch doctor data and chat history on initial load and every 10 seconds
    useEffect(() => {
        fetchDoctorData(); // Initial fetch

        // Set interval to refresh chat history every 10 seconds
        const intervalId = setInterval(fetchDoctorData, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [receiver]);

    // Establish WebSocket connection for real-time messaging
    useEffect(() => {
        const socket = new SockJS('http://localhost:9999/ws');
        const client = Stomp.over(socket);
    
        client.connect({}, () => {
            // Subscribe to individual messages
            client.subscribe(`/user/queue/messages`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            });
    
            // Subscribe to chat history updates
            client.subscribe(`/user/queue/history`, (message) => {
                const updatedChatHistory = JSON.parse(message.body);
                setMessages(updatedChatHistory);
            });
    
            setStompClient(client);
        });
    
        // Clean up when the component is unmounted
        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [doctorData.email, receiver]); // Ensure dependencies are correct
    
    // Handle sending messages
    const sendMessage = () => {
        if (stompClient && inputMessage.trim() && doctorData.email) {
            const message = {
                sender: doctorData.email,
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
               
            <div className="chat-main">
                <div className="chat-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-bubble ${msg.sender === doctorData.email ? 'sent' : 'received'}`}
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
    );
};

export default DoctorChat;
