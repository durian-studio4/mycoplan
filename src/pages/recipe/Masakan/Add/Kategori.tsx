import React, { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Modal, Row, Input, Button, Table } from 'antd';
import styles from '../index.less';

interface Props {
  visible: boolean;
  onSet: Dispatch<SetStateAction<never[]>>;
  onCancel: () => void;
}

const KategoriComponent: React.FC<Props> = ({ visible, onCancel, onSet }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState([]);

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
        baseURL: `${REACT_APP_ENV}/admin/products`,
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
    onSet(kategori);
    onCancel();
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log('selected', selectedRows);
      setKategori(selectedRows);
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
        key: 'name',
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
    <Modal visible={visible} title="Pilih Kategori Resep" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          dataSource={data_array}
          loading={loading}
          columns={columns}
        />
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          // disabled={onLoadButton}
          // onClick={handleClearState}
          onClick={onCancel}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          onClick={onSave}
          // disabled={isDisabled || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default KategoriComponent;
