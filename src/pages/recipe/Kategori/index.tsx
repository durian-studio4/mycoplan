import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const KategoriComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Kategori</h1>

      <Table />
    </div>
  );
};

export default KategoriComponent;
