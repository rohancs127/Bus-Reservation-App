import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/buses.css'

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
    <div className='bus-page-div'>
      <h1 className='heading'>Buses</h1>
      <div>
        {buses.map((bus) => (
          <div key={bus.bus_id}>
            <div className='buses-content' id='bus-number'>Bus Number: {bus.bus_number}</div> 
            <div className='buses-content'> <strong>Capacity:</strong> {bus.capacity}</div> 
            <div className='buses-content'> <strong>Type:</strong> {bus.type}</div>  
            <div className='buses-content'> <strong>Current status:</strong> {bus.status}</div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buses;
