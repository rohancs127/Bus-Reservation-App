import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/buses')
      .then(response => {
        setBuses(response.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch Buses');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Bus List</h1>
      <ul>
        {buses.map((bus) => (
          <ul key={bus.bus_id}>
            <h4>Bus Number: {bus.bus_number}</h4> 
            <p> Capacity: {bus.capacity}</p> 
            <p> Type: {bus.type}</p>  
            <p> Current status: {bus.status}</p>  
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Buses;
