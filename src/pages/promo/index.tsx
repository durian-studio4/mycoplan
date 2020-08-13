import React, { useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const PromoComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible);

  return (
    <div>
      <p className={styles.title}>Promo</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Promo</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Promo"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary" onClick={handleVisible}>
              Buat Promo
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
      <AddComponent visible={visible} onCancel={handleVisible} />
    </div>
  );
};

export default PromoComponent;
