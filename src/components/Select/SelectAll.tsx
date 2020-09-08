import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Cookie from 'js-cookie';

import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  address: string;
  initial?: string;
  handleChange: (value: any, option: any) => void;
  disabled?: boolean;
}

const SelectAllComponent: React.FC<Props> = ({ initial = '', address, handleChange, disabled }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching(address);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [address]);

  const fetching = async (param: string) => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: param,
        withCredentials: true,
      });
      const json = await wait.data;
      const result = await json.data;
      setLoading(false);
      setData(result);
    } catch (err) {
      console.log(err, 'error');
      setLoading(false);
    }
  };

  return (
    <Select
      labelInValue
      defaultValue={{ key: initial || 'Mohon Pilih Promo' }}
      style={{
        width: '100%',
        minHeight: '2em',
      }}
      onChange={handleChange}
      loading={loading}
      disabled={disabled}
    >
      {data &&
        data.map((data) => {
          return (
            <Option key={data.id} id={data.id} value={data.name}>
              {data.name}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectAllComponent;
