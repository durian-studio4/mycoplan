import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  initial?: string;
  handleChange: (value: any, option: any) => void;
}

const SelectPenyesuaianComponent: React.FC<Props> = ({ initial, handleChange }) => {
  const data = [
    // {
    //   id: 'add',
    //   value: '+',
    // },
    {
      id: 'substract',
      value: '-',
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
            <Option key={data.id} id={data.id} value={data.value}>
              {data.value}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectPenyesuaianComponent;
