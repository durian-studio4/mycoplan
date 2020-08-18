import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {}

const SelectSubKategoriComponent: React.FC<Props> = () => {
  const data = [
    {
      id: 0,
      value: 'Sapi',
    },
  ];

  return (
    <Select
      labelInValue
      // defaultValue={{ key: initial || 'Mohon Pilih' }}
      style={{
        width: '100%',
        minHeight: '2em',
      }}
      // onChange={handleChange}
    >
      {data &&
        data.map((data) => {
          return (
            <Option key={data.id} id={data.id} value={data.value}>
              {data.value}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectSubKategoriComponent;
