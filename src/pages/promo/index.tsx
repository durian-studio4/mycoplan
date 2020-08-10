import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const PromoComponent: React.FC<Props> = () => {
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
              placeholder="Search Promo"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary">
              Buat Promo
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
      {/* <AddComponent /> */}
    </div>
  );
};

export default PromoComponent;
