import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const MerchantDaftarComponent: React.FC<Props> = () => {
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
              placeholder="Search Merchant"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary">
              + Tambah Merchant
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default MerchantDaftarComponent;
