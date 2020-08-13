import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const MerchantTotalProdukComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Produk</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Total Produk</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Total"
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

export default MerchantTotalProdukComponent;
