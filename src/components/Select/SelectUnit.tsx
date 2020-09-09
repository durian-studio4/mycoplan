import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  handleChange: (value: any, option: any) => void;
  initial?: string;
  disabled?: boolean;
}

const SelectUnitComponent: React.FC<Props> = ({ handleChange, initial, disabled }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching();
    }, 0);
    return () => clearTimeout(timeOut);
  }, []);

  const fetching = async (param: string) => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: `${REACT_APP_ENV}/admin/units`,
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
      defaultValue={{ key: initial || 'Mohon Pilih Unit' }}
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

export default SelectUnitComponent;
