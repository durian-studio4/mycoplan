import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

import useFetch from '@/hooks/useFetch';

interface Props {}

const MerchantDaftarComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const [
    data_merchant,
    status_merchant,
    loading_merchant,
    error_merchant,
    fetchMerchant,
  ] = useFetch();

  const handleVisible = () => setVisible(!visible);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchMerchant(`${REACT_APP_ENV}/admin/merchants`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        />
        <AddComponent visible={visible} onCancel={handleVisible} />
      </Card>
    </div>
  );
};

export default MerchantDaftarComponent;
