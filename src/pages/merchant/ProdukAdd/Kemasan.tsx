import React, { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Modal, Row, Input, Button, Table } from 'antd';
import styles from './index.less';

// import SelectPeran from '@/components/Select/SelectPeran';
import useFilterColumn from '@/hooks/useFilterColumn';

interface Props {
  visible: boolean;
  onCancel: () => void;
  category: string;
  subcategory: string;
  id_merchant: string;
  onSet: Dispatch<SetStateAction<never[]>>;
}

const KemasanComponent: React.FC<Props> = ({
  visible,
  id_merchant,
  category,
  subcategory,
  onCancel,
  onSet,
}) => {
  const [getColumnSearchProps] = useFilterColumn();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const [kemasan, setKemasan] = useState([]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetching(id_merchant, category, subcategory);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [id_merchant, category, subcategory]);

  const fetching = async (id_merchant: string, category: string, subcategory: string) => {
    setLoading(true);
    try {
      const wait = await axios({
        method: 'get',
        baseURL: `${REACT_APP_ENV}/admin/products/?merchant=${id_merchant}&category=${category}&subcategory=${subcategory}`,
        withCredentials: true,
      });
      const json = await wait.data;
      const result = await json;
      setLoading(false);
      setData(result.data);
      setFilter(result.filters);
      return result;
    } catch (err) {
      console.log(err, 'error');
      setLoading(false);
    }
  };

  const onSave = () => {
    onSet(kemasan);
    onCancel();
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setKemasan(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'Name',
        dataIndex: 'name',
        ...getColumnSearchProps('name'),
      },
    ],
    [],
  );

  let data_array = [];

  for (let key in data) {
    data_array.push({
      key: data[key].id,
      id_product: data[key].id,
      name: data[key].name,
    });
  }

  return (
    <Modal visible={visible} title="Pilih Kemasan Lain" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <Row>
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '100%' }}>
              <tbody>
                <tr>
                  <td align="left">Supermarket</td>
                  <td align="center">:</td>
                  <td align="left" style={{ textAlign: 'center' }}>
                    {filter && filter.merchant}
                  </td>
                </tr>
                <tr>
                  <td align="left">Kategori</td>
                  <td align="center">:</td>
                  <td align="left" style={{ textAlign: 'center' }}>
                    {filter && filter.category}
                  </td>
                </tr>
                <tr>
                  <td align="left">Sub Kategori</td>
                  <td align="center">:</td>
                  <td align="left" style={{ textAlign: 'center' }}>
                    {filter && filter.subcategory}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row>
        <Table
          style={{ marginTop: '1em' }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          loading={loading}
          dataSource={data_array}
          columns={columns}
        />
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button className={styles.button} onClick={onCancel} type="primary" danger>
          Batal
        </Button>
        <Button className={styles.button} onClick={onSave} type="primary">
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default KemasanComponent;
