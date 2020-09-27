import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Spin } from 'antd';

const Option = Select.Option;

interface Props {
  handleChange: (value: any, option: any) => void;
  onReset: () => void;
  id: string;
  initial?: string;
  disabled?: boolean;
}

const SelectSubKategoriComponent: React.FC<Props> = ({
  initial,
  id,
  disabled,
  handleChange,
  onReset,
}) => {
  const [data, setData] = useState([]);
  const [id_kategori, setIdKategori] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id_kategori !== id) {
      setIdKategori(id);
      onReset();
    }
  }, [id]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching(id_kategori);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [id_kategori]);

  const fetching = async (id: string) => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: `${REACT_APP_ENV}/admin/product/categories/${id}`,
        withCredentials: true,
      });
      const json = await wait.data;
      const result = await json.data.children;
      setLoading(false);
      setData(result);
    } catch (err) {
      console.log(err, 'error');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  return (
    <Select
      labelInValue
      defaultValue={{ key: initial || 'Mohon Pilih Sub Kategori' }}
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

export default SelectSubKategoriComponent;
