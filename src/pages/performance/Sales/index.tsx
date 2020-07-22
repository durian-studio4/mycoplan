import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const SalesComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Sales</h1>

      <Table />
    </div>
  );
};

export default SalesComponent;
