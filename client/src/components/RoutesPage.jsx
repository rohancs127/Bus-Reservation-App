import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/routesPage.css';

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
    <div className='routes-page-div'>
      <h1 className='heading'>Routes List</h1>
      <div className='routes-block-div'>
        {routes.map((route) => (
          <div key={route.route_id}>
            <div className='routes-content' id='route-id'>Route ID: {route.route_id}</div>  
            <div className='routes-content'> <strong>Source:</strong> {route.source}</div>   
            <div className='routes-content'> <strong>Destination:</strong> {route.destination}</div>   
            <div className='routes-content'> <strong>Duration:</strong> {route.duration.hours}hr {route.duration.minutes}mins</div>  
            <div className='routes-content'> <strong>Price:</strong> ${route.fare}</div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutesPage;
