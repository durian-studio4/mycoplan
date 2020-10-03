import React, { useContext } from 'react';
import styles from './index.less';

import TableMerchant from './TableMerchant';
import TableTotal from './TableTotal';
import Chart from './Chart';

import { PermissionContext } from '@/layouts/context';

import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const PenjualanComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const penjualan_access = context && context[6];

  if (
    penjualan_access &&
    !penjualan_access.read &&
    !penjualan_access.delete &&
    !penjualan_access.update &&
    !penjualan_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <div>
      <p className={styles.title}>Penjualan</p>
      <Chart />
      <TableTotal />
      <TableMerchant />
    </div>
  );
};

export default PenjualanComponent;
