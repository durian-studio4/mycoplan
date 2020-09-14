import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  handleChange: (value: any, option: any) => void;
  initial?: string;
  disabled?: boolean;
}

const SelectGenderComponent: React.FC<Props> = ({ initial, disabled, handleChange }) => {
  const data = [
    {
      id: 'L',
      value: 'Laki-laki',
    },
    {
      id: 'P',
      value: 'Perempuan',
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
      disabled={disabled}
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

export default SelectGenderComponent;
