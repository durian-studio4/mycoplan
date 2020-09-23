import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';

const SearchLocationInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);
  let autoComplete: any;

  console.log(query, 'query');

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_ENV_GMAPS}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef),
    );
  }, []);

  const loadScript = (url: string, callback: any) => {
    let script: any = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery: any, autoCompleteRef: any) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      types: ['(cities)'],
      componentRestrictions: { country: 'id' },
    });
    autoComplete.setFields(['address_components', 'formatted_address']);
    autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery));
  }

  async function handlePlaceSelect(updateQuery: any) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
  }

  return (
    <div className="search-location-input">
      <Input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
};

export default SearchLocationInput;
