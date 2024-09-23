import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/routes')
      .then(response => {
        setRoutes(response.data);
        setError(null); 
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch Routes');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Routes List</h1>
      <ul>
        {routes.map((route) => (
          <ul key={route.route_id}>
            <h4>Route ID: {route.route_id}</h4>  
            <p> Source: {route.source}</p>   
            <p> Destination: {route.destination}</p>   
            <p> Duration: {route.duration.hours}hr {route.duration.minutes}mins</p>  
            <p> Fare: ${route.fare}</p> 
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default RoutesPage;
