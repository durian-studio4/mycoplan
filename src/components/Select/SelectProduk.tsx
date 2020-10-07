import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Spin } from 'antd';

const Option = Select.Option;

interface Props {
  handleChange: (value: any, option: any) => void;
  initial?: string;
  disabled?: boolean;
  id_merchant: string;
}

const SelectProduk: React.FC<Props> = ({ initial, id_merchant, disabled, handleChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching(id_merchant);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [id_merchant]);

  const fetching = async (id: string) => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: `${REACT_APP_ENV}/admin/products?merchant=${id}`,
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

  if (loading) {
    return <Spin />;
  }

  return (
    <Select
      labelInValue
      defaultValue={{ key: initial || 'Mohon Pilih Produk' }}
      style={{
        width: '100%',
        minHeight: '2em',
      }}
      onChange={handleChange}
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

export default SelectProduk;
