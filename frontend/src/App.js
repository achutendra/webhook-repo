import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>GitHub Repository Events</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            {event.type === 'push' && `${event.author} pushed to ${event.to_branch} on ${new Date(event.timestamp).toUTCString()}`}
            {event.type === 'pull_request' && `${event.author} submitted a pull request from ${event.from_branch} to ${event.to_branch} on ${new Date(event.timestamp).toUTCString()}`}
            {event.type === 'merge' && `${event.author} merged branch ${event.from_branch} to ${event.to_branch} on ${new Date(event.timestamp).toUTCString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
