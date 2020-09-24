import React, { useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import styles from './index.less';

interface Props {}

const ProfileComponent: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  console.log(value, 'value');
  return (
    <div>
      <Card>
        <p>Test</p>
        <GooglePlacesAutocomplete
          apiKey={REACT_APP_ENV_GMAPS}
          selectProps={{
            value,
            onChange: setValue,
          }}
        />
      </Card>
    </div>
  );
};

export default ProfileComponent;
