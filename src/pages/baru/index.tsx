import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import Table from './Table';

interface Props {}

const ProfileComponent: React.FC<Props> = () => {
  return (
    <div>
      <Card>
        <Table />
      </Card>
    </div>
  );
};

export default ProfileComponent;
