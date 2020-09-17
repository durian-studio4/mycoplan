import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

export interface Merchant {
  formData: any;
  clear: () => void;
}

interface Props {}

const MerchantDaftarComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [
    data_merchant,
    status_merchant,
    loading_merchant,
    error_merchant,
    fetchMerchant,
  ] = useFetch();

  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchMerchant(`${REACT_APP_ENV}/admin/merchants`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const handleVisible = () => setVisible(!visible);

  const handleVisibleUpdate = (id: string) => {
    setIdUpdate(id);
    setVisibleUpdate(true);
  };

  const handleVisibleUpdateCancel = () => {
    setIdUpdate('');
    setVisibleUpdate(false);
  };

  const createMerchant = ({ formData, clear }: Merchant) => {
    postCreate(`${REACT_APP_ENV}/admin/merchants/`, formData, clear);
  };

  const consoleLog = () => console.log('inactive');

  const deactiveMerchant = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');
    postCreate(`${REACT_APP_ENV}/admin/merchants/${id}?_method=put`, formData, consoleLog);
  };

  // const updateMerchant = ({ formData, clear }: any) => {
  //   postCreate(`${REACT_APP_ENV}/admin/merchants//${id_update}?_method=put`, formData, clear);
  // };

  const deleteMerchant = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/merchants/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Daftar Merchant</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Merchant</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Merchant"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button_search} onClick={handleVisible} type="primary">
              + Tambah Merchant
            </Button>
          </div>
        </Row>
        <TableComponent
          data={data_merchant}
          loading={Boolean(loading_merchant)}
          status={Number(status_merchant)}
          error={error_merchant}
          visibleUpdate={handleVisibleUpdate}
          onDeactive={deactiveMerchant}
          onDelete={deleteMerchant}
        />
        {visible ? <AddComponent visible={visible} onCancel={handleVisible} /> : null}
      </Card>
    </div>
  );
};

export default MerchantDaftarComponent;
