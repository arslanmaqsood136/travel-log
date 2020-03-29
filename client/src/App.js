import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { lisLogsEntries } from './API';
import { Marker, Popup } from 'react-map-gl';

const App = () => {
  const [logEntries, setLogEntires] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
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
  const showAddMarkerPopup = event => {
    const longitude = event.lngLat[0];
    const latitude = event.lngLat[1];
    setAddEntryLocation({
      longitude,
      latitude
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/arslanmaqsood/ck6xldb890luh1is22kdak4e9"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div onClick={() => setShowPopup({ [entry._id]: true })}>
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
          {showPopup[entry._id] ? (
            <>
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h1>{entry.title}</h1>
                  <p>{entry.comments}</p>
                  <small>
                    Visit Date: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </div>
              </Popup>
            </>
          ) : null}
        </>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
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
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <h3>Add your new Log Entry Here</h3>
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};
export default App;
