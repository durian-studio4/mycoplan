import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const MerchantUnitProdukComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Unit Produk</p>
      <AddComponent />
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Unit Produk</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Unit Produk"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default MerchantUnitProdukComponent;
