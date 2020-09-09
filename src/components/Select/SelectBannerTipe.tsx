import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  initial?: string;
  handleChange: (value: any, option: any) => void;
}

const SelectBannerTipeComponent: React.FC<Props> = ({ initial, handleChange }) => {
  const data = [
    {
      id: 0,
      value: 'Gambar Saja',
      data: 'gambar',
    },
    {
      id: 1,
      value: 'Gambar & Detail',
      data: 'gambar_detail',
    },
  ];

  return (
    <Select
      labelInValue
      defaultValue={{ key: initial || 'Mohon Pilih' }}
      style={{
        width: '100%',
        minHeight: '2em',
      }}
      onChange={handleChange}
    >
      {data &&
        data.map((data) => {
          return (
            <Option key={data.data} id={data.id} value={data.value}>
              {data.value}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectBannerTipeComponent;
