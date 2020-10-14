import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  handleChange: (value: any, option: any) => void;
  initial?: string;
  disabled?: boolean;
}

const SelectMerchantPenjualan: React.FC<Props> = ({ initial, disabled, handleChange }) => {
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
        baseURL: `${REACT_APP_ENV}/admin/merchants`,
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

  let data_array = [
    {
      id: 0,
      name: 'Semua Penjualan',
    },
  ];

  for (let key in data) {
    data_array.push({
      id: data[key].id,
      name: data[key].name,
    });
  }

  return (
    <Select
      labelInValue
      defaultValue={{ key: initial || 'Mohon Pilih Merchant' }}
      style={{
        width: '100%',
        minHeight: '2em',
      }}
      onChange={handleChange}
      loading={loading}
      disabled={disabled}
    >
      {data_array &&
        data_array.map((data) => {
          return (
            <Option key={data.id} id={data.id} value={data.name}>
              {data.name}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectMerchantPenjualan;
