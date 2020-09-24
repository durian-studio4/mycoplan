import React, { useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styles from './index.less';

interface Props {}

const ProfileComponent: React.FC<Props> = () => {
  const [value, setValue] = useState('');

  const handleChange = (address: any) => {
    setValue(address);
  };

  const handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => {
        console.log(results, 'result');
        getLatLng(results[0]);
      })
      .then((latLng: any) => console.log('Success', latLng))
      .catch((error: any) => console.error('Error', error));
  };

  console.log(value, 'value');

  return (
    <PlacesAutocomplete value={value} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
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
  );
};

export default ProfileComponent;
