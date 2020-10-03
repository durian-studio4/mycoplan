import React, { useEffect, useContext } from 'react';
import {
  // Button,
  Card,
  Row,
  // Input
} from 'antd';
// import { NavLink } from 'umi';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';

import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const MerchantTotalProdukComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/merchants`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const merchant_access = context && context[2];

  if (
    merchant_access &&
    !merchant_access.read &&
    !merchant_access.delete &&
    !merchant_access.update &&
    !merchant_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <div>
      <p className={styles.title}>Produk</p>
      <Card style={{ display: merchant_access && merchant_access.read ? 'block' : 'none' }}>
        <Row justify="space-between">
          <p className={styles.title}>Total Produk</p>
          {/* <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Merchant"
              onChange={onChangeState}
              value={name}
              onKeyDown={handleKey}
            />
            <NavLink to="/merchant/produk/add">
              <Button className={styles.button} type="primary">
                Tambah Produk
              </Button>
            </NavLink>
          </div> */}
        </Row>
        <TableComponent
          merchant_access={merchant_access}
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
