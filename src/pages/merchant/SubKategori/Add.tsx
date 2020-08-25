import React from 'react';
import { Card, Row, Input, Button, Col, Divider } from 'antd';
import styles from './index.less';

import SelectAll from '@/components/Select/SelectAll';

interface Props {}

const MerchantKategoriAddComponent: React.FC<Props> = () => {
  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Sub Kategori Produk Baru</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.col}>
            <div className={styles.box3}>
              <SelectAll initial="Daging" />
            </div>
            <br />
            <div className={styles.box3}>
              <Input className={styles.input} placeholder="Ikan" />
            </div>
          </div>
        </Row>
        <Button className={styles.button} type="primary">
          Simpan
        </Button>
      </Card>
    </div>
  );
};

export default MerchantKategoriAddComponent;
