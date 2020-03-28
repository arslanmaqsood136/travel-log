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
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
            <img
              style={{
                width: `${6 * viewport.zoom}px`,
                height: `${6 * viewport.zoom}px`
              }}
              className="marker"
              src="https://i.imgur.com/y0G5YTX.png"
              alt="marker"
            />
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};
export default App;
