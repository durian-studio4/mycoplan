import React, { Fragment } from 'react';
import { Input } from 'antd';
import PlacesAutocomplete from 'react-places-autocomplete';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import styles from '../index.less';

interface Props {
  selected: any;
  address: any;
  currentPosition: any;
  onSelect: (item: any) => void;
  onHandleChange: (address: any) => void;
  onHandleSelect: (address: any) => void;
  onClearSelect: () => void;
  onMarkerDragEnd: (e: google.maps.MouseEvent) => void;
}

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

const MapComponent: React.FC<Props> = ({
  address,
  selected,
  currentPosition,
  onSelect,
  onClearSelect,
  onMarkerDragEnd,
  onHandleChange,
  onHandleSelect,
}) => {
  return (
    <Fragment>
      <div className={styles.box10}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="pin">
            Pin Alamat
          </label>
          <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={currentPosition}>
            {/* {locations.map((item) => {
              return (
                <Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />
              );
            })} */}
            {currentPosition.lat ? (
              <Marker
                position={currentPosition}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
              />
            ) : null}
            {selected.location && (
              <InfoWindow position={selected.location} onCloseClick={onClearSelect}>
                <p>{selected.name}</p>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
      <div className={styles.box10}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="alamat">
            Alamat Merchant
          </label>
          <PlacesAutocomplete
            value={address}
            onChange={onHandleChange}
            onSelect={onHandleSelect}
            shouldFetchSuggestions={address.length > 3}
            searchOptions={{
              location: currentPosition,
              types: ['address'],
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Input
                  id="alamat"
                  {...getInputProps({
                    placeholder: 'Cari alamat ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
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
        </div>
      </div>
    </Fragment>
  );
};

export default MapComponent;
