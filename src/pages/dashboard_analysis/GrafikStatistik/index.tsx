import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const GrafikStatistikComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Grafik Statistik</h1>

      <Table />
    </div>
  );
};

export default GrafikStatistikComponent;
