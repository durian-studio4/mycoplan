import React from 'react';
import styles from './index.less';

import TableMerchant from './TableMerchant';
import TableTotal from './TableTotal';
import Chart from './Chart';

interface Props {}

const PenjualanComponent: React.FC<Props> = () => {
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
