import React, { useState, useEffect } from 'react';
// import Cookie from 'js-cookie';

import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  //   address: string;
  //   initial?: string;
  //   handleChange: (value: any, option: any) => void;
  //   disabled?: boolean;
}

const SelectAllComponent: React.FC<Props> = () =>
  // { address, initial, handleChange, disabled }
  {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //   const timeOut = setTimeout(() => {
    //     fetching(address);
    //   }, 0);
    //   return () => clearTimeout(timeOut);
    // }, [address]);

    // const fetching = async (param: string) => {
    //   setLoading(true);
    //   try {
    //     const wait = await fetch(param, {
    //       headers: {
    //         Authorization: String(Cookie.get('token')),
    //       },
    //     });
    //     const json = await wait.json();
    //     const result = await json.data;
    //     setLoading(false);
    //     setData(result);
    //   } catch (err) {
    //     console.log(err.message, 'error');
    //     setLoading(false);
    //   }
    // };

    return (
      <Select
        labelInValue
        // defaultValue={{ key: initial || 'Mohon Pilih' }}
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
    );
  };

export default SelectAllComponent;
