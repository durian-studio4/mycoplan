import React, { useMemo, useContext, Fragment } from 'react';
import { Table, Row, Button, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);
  // const [getColumnSearchProps] = useFilterColumn();

  const penjualan_access = context && context[6];

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
      },
      {
        align: 'center',
        title: 'Tanggal',
      },
      {
        align: 'center',
        title: 'Unit',
      },
      {
        align: 'center',
        title: 'Total Penjualan (Rp.)',
      },
      {
        align: 'center',
        title: 'Total Lebih Bayar (Rp.)',
      },
      {
        align: 'center',
        title: 'Total Kurang Bayar (Rp.)',
      },
      {
        align: 'center',
        title: 'Total Penyesuaian Penjualan (Rp.)',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return (
    <Card
      style={{
        display: penjualan_access && penjualan_access.read ? 'block' : 'none',
        marginBottom: '1em',
      }}
    >
      <Row justify="space-between">
        <p className={styles.title}>Total Semua Penjualan</p>
        <div className={styles.row_box}>
          <Button className={styles.button} type="primary">
            <DownloadOutlined /> Download CSV
          </Button>
        </div>
      </Row>
      <Table columns={columns} />
    </Card>
  );
};

export default TableComponent;
