import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import SelectComponent from './Select';

interface Props {}

const MerchantProdukComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Produk</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Produk</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Search Produk"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary">
              + Tambah Produk
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default MerchantProdukComponent;
