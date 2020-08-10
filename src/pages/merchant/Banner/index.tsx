import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const MerchantBannerComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Banner Merchant</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Banner Merchant</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Search Banner Merchant"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary">
              + Buat Banner Merchant
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default MerchantBannerComponent;
