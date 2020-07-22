import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const CreateComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Create</h1>

      <Table />
    </div>
  );
};

export default CreateComponent;
