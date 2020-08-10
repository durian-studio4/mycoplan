import React from 'react';
import { Button, Card, Row } from 'antd';
import TableComponent from './Table';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

interface Props {}

const BannerComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Pengaturan Pengguna</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Pengguna</p>
          <Button className={styles.button} type="primary">
            <DownloadOutlined /> Download CSV
          </Button>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default BannerComponent;
