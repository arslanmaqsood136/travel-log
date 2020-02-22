import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { lisLogsEntries } from './API';
import { Marker } from 'react-map-gl';

const App = () => {
  const [logEntries, setLogEntires] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 33.673038,
    longitude: 72.984138,
    zoom: 5
  });
  useEffect(() => {
    (async () => {
      const logEntries = await lisLogsEntries();
      setLogEntires(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/arslanmaqsood/ck6xldb890luh1is22kdak4e9"
      mapboxApiAccessToken="pk.eyJ1IjoiYXJzbGFubWFxc29vZCIsImEiOiJjazZ4a3JrdnQwbW50M2htb2c2MHI1NGk5In0.aB8aqFm7kl76yyy-ryqM5w"
      onViewportChange={setViewport}
    >
      {logEntries.map(entry => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={12}
          offsetTop={-24}
        >
          <div>
          <svg
            className="marker"
            style={{
              width:'24px',
              height:'24px'
            }}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"  
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};
export default App;
