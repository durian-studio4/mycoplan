import React from 'react';
import styles from '../index.less';

import TableKategori from './TableKategori';
import TableSubKategori from './TableSubKategori';
import TableTotal from './TableTotal';
import TableProduk from './TableProduk';

interface Props {}

const PenjualanDetailComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Penjualan</p>
      <TableTotal />
      <TableKategori />
      <TableSubKategori />
      <TableProduk />
    </div>
  );
};

export default PenjualanDetailComponent;
