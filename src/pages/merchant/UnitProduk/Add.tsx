import React from 'react';
import { Card, Row, Input, Button } from 'antd';
import styles from './index.less';

interface Props {}

const MerchantUnitProdukAddComponent: React.FC<Props> = () => {
  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Unit Produk Baru</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.box3}>
            <Input className={styles.input} />
          </div>
        </Row>
        <div className={styles.group}></div>
        <Button className={styles.button}>Simpan</Button>
      </Card>
    </div>
  );
};

export default MerchantUnitProdukAddComponent;
