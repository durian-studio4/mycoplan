import React from 'react';
import { Button, Card, Row } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const AksesComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Akses Peran</p>
      <Card>
        <p className={styles.title}>Daftar Peran</p>
        <TableComponent />
      </Card>
    </div>
  );
};

export default AksesComponent;
