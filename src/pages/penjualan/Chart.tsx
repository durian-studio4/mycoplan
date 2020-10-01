import React, { useContext } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

interface Props {}

const ChartComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);
  // const [getColumnSearchProps] = useFilterColumn();

  const penjualan_access = context && context[6];

  return (
    <Card
      style={{
        display: penjualan_access && penjualan_access.read ? 'block' : 'none',
        marginBottom: '1em',
      }}
    >
      <p className={styles.title}>Total Semua Penjualan</p>
    </Card>
  );
};

export default ChartComponent;
