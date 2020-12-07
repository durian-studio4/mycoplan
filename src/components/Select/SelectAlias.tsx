import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  role: string;
  handleChange: (value: any, option: any) => void;
  initial?: string;
  disabled?: boolean;
}

const SelectAlias: React.FC<Props> = ({ initial, role, disabled, handleChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching(role);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [role]);

  const fetching = async (role: string) => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: `${REACT_APP_ENV}/${role}/product-aliases`,
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
      defaultValue={{ key: initial || 'Mohon Pilih Alias' }}
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
            <Option key={data.id} id={data.id} value={data.alias}>
              {data.alias}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectAlias;
