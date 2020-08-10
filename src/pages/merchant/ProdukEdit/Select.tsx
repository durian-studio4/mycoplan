import React from 'react';
import { Card, Select } from 'antd';
import styles from './index.less';

interface Props {
  initial?: string;
}

const SelectComponent: React.FC<Props> = ({ initial }) => {
  return (
    <Card style={{ margin: '1.5em 0px' }}>
      <p className={styles.title}>Pilih Merchant</p>
      <Select
        labelInValue
        defaultValue={{ key: initial || 'Mohon Pilih' }}
        style={{
          width: '100%',
          minHeight: '2em',
        }}
        // onChange={handleChange}
        // loading={loading}
        // disabled={disabled}
      >
        {/* {data &&
        data.map((data) => {
          return (
            <Option
              key={data.id}
              id={data.id}
              value={
                data.satuan || data.type || data.nama_barang || data.name || data.type_pembayaran
              }
            >
              {data.satuan || data.type || data.nama_barang || data.name || data.type_pembayaran}
            </Option>
          );
        })} */}
      </Select>
    </Card>
  );
};

export default SelectComponent;
