import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const TotalPenggunaComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Total Pengguna</h1>

      <Table />
    </div>
  );
};

export default TotalPenggunaComponent;
