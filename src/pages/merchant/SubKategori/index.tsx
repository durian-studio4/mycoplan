import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import SelectAll from '@/components/Select/SelectAll';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const MerchantSubKategoriComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Sub Kategori Produk</p>
      <AddComponent />
      <Card>
        <p className={styles.title}>Sub Kategori</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.box3} style={{ margin: '5px' }}>
            <SelectAll initial="Daging" />
          </div>
          <Input
            className={styles.input_search}
            id="name"
            type="text"
            placeholder="Cari Sub Kategori"
            // onChange={onChangeState}
            // value={name}
            // onKeyDown={handleKey}
          />
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default MerchantSubKategoriComponent;
