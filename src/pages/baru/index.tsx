import React, { useState, Fragment, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

interface Props {}

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

const mapStyles = {
  height: '50vh',
  width: '100%',
};

const initialLatLng = {
  lat: '',
  lng: '',
};

const ProfileComponent: React.FC<Props> = () => {
  const [value, setValue] = useState('');

  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState(initialLatLng);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  const onSuccess = (position: any) => {
    console.log(position, 'position');
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const onSelect = (item: any) => {
    console.log(item, 'item');
    setSelected(item);
  };

  const onMarkerDragEnd = (e: any) => {
    console.log(e, 'marker');
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  const handleChange = (address: any) => {
    setValue(address);
  };

  const handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => {
        setValue(results[0].formatted_address);
        return getLatLng(results[0]);
      })
      .then((latLng: any) => setCurrentPosition(latLng))
      .catch((error: any) => console.error('Error', error));
  };

  console.log(value, currentPosition, selected);

  return (
    <Fragment>
      <PlacesAutocomplete
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        shouldFetchSuggestions={value.length > 3}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </Fragment>
  );
};

export default ProfileComponent;
