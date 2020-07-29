import React from 'react';
import { Button, Card, Row } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const BannerComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Banner Beranda</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Banner</p>
          <Button className={styles.button} type="primary">
            + Tambah Banner
          </Button>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default BannerComponent;
