import React from 'react';
import { Button, Card, Row } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const SettingsComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Akses Admin</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Admin</p>
          <Button className={styles.button} type="primary">
            + Tambah Akses
          </Button>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default SettingsComponent;
