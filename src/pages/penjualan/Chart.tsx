import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

interface Props {}

const ChartComponent: React.FC<Props> = () => {
  return (
    <Card style={{ marginBottom: '1em' }}>
      <p className={styles.title}>Total Semua Penjualan</p>
    </Card>
  );
};

export default ChartComponent;
