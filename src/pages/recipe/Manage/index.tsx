import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const ManageComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Manage</h1>

      <Table />
    </div>
  );
};

export default ManageComponent;
