import React, { useMemo, Fragment } from 'react';
import { Table, Row, Button, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from '../index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
      },
      {
        align: 'center',
        title: 'Tanggal',
      },
      {
        align: 'center',
        title: 'ID Produk',
      },
      {
        align: 'center',
        title: 'SKU',
      },
      {
        align: 'center',
        title: 'Nama Produk',
      },
      {
        align: 'center',
        title: 'Kategori',
      },
      {
        align: 'center',
        title: 'Sub Kategori',
      },
      {
        align: 'center',
        title: 'Unit',
      },
      {
        align: 'center',
        title: 'Total Penjualan (Rp.)',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return (
    <Card style={{ marginBottom: '1em' }}>
      <Row justify="space-between">
        <p className={styles.title}>Penjualan Per Produk</p>
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
