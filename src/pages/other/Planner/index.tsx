import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const PlannerComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Planner</h1>

      <Table />
    </div>
  );
};

export default PlannerComponent;
