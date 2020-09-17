import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapStyles = {
  height: '50vh',
  width: '100%',
};

const locations = [
  {
    name: 'Location 1',
    location: {
      lat: 41.3954,
      lng: 2.162,
    },
  },
  {
    name: 'Location 2',
    location: {
      lat: 41.3917,
      lng: 2.1649,
    },
  },
  {
    name: 'Location 3',
    location: {
      lat: 41.3773,
      lng: 2.1585,
    },
  },
  {
    name: 'Location 4',
    location: {
      lat: 41.3797,
      lng: 2.1682,
    },
  },
  {
    name: 'Location 5',
    location: {
      lat: 41.4055,
      lng: 2.1915,
    },
  },
];

const MapContainer: React.FC = () => {
  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  const onSuccess = (position: any) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const onSelect = (item: any) => {
    setSelected(item);
  };

  const onMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey={REACT_APP_ENV_GMAPS}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={currentPosition}>
        {locations.map((item) => {
          return <Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />;
        })}
        {currentPosition.lat ? (
          <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true}
          />
        ) : null}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            // clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
export default MapContainer;
