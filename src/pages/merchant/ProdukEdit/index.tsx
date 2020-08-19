import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import TableComponent from './Table';

interface Props {}

const MerchantProdukComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Lotte Mart Kelapa Gading</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Produk Lotte Mart Kelapa Gading</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Produk"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <NavLink to="/merchant/produk/add">
              <Button className={styles.button_search} type="primary">
                + Tambah Produk
              </Button>
            </NavLink>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default MerchantProdukComponent;
