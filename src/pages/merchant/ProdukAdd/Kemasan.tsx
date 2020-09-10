import React, { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Modal, Row, Input, Button, Table } from 'antd';
import styles from './index.less';

// import SelectPeran from '@/components/Select/SelectPeran';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSet: Dispatch<SetStateAction<never[]>>;
}

const KemasanComponent: React.FC<Props> = ({ visible, onCancel, onSet }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kemasan, setKemasan] = useState([]);

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
        baseURL: `${REACT_APP_ENV}/admin/recipe/categories`,
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
      },
    ],
    [],
  );

  let data_array = [];

  for (let key in data) {
    data_array.push({
      key: data[key].id,
      id: data[key].id,
      name: data[key].name,
    });
  }

  return (
    <Modal visible={visible} title="Pilih Kemasan Lain" closable={false} footer={null}>
      <div className={styles.modal_body}>
        {/* <Row>
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '100%' }}>
              <tbody>
                <tr>
                  <td align="left">Supermarket</td>
                  <td align="center">:</td>
                  <td align="right">{data && data.tanggal}</td>
                </tr>
                <tr>
                  <td align="left">Kategori</td>
                  <td align="center">:</td>
                  <td align="right">{data && data.nama_sales}</td>
                </tr>
                <tr>
                  <td align="left">Sub Kategori</td>
                  <td align="center">:</td>
                  <td align="left">PT. Alternate Farma</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row> */}
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
