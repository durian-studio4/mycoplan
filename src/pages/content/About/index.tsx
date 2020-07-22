import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const AboutComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>About</h1>

      <Table />
    </div>
  );
};

export default AboutComponent;
