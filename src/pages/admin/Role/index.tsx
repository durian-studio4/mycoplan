import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const RoleComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Role</h1>

      <Table />
    </div>
  );
};

export default RoleComponent;
