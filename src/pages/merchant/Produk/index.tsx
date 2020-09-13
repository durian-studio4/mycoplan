import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';

interface Props {}

const MerchantTotalProdukComponent: React.FC<Props> = () => {
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/products`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              placeholder="Cari Merchant"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <NavLink to="/merchant/produk/add">
              <Button className={styles.button} type="primary">
                Tambah Produk
              </Button>
            </NavLink>
          </div>
        </Row>
        <TableComponent
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
        />
      </Card>
    </div>
  );
};

export default MerchantTotalProdukComponent;
