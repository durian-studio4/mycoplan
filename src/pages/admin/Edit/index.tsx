import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const AdminEditComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Edit Akses</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Akses Halaman</p>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default AdminEditComponent;
