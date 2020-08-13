import React, { useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const MerchantBannerComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible);

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
              placeholder="Cari Banner Merchant"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} onClick={handleVisible} type="primary">
              + Buat Banner Merchant
            </Button>
          </div>
        </Row>
        <TableComponent />
        <AddComponent visible={visible} onCancel={handleVisible} />
      </Card>
    </div>
  );
};

export default MerchantBannerComponent;
