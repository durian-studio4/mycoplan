import React, { useMemo, Fragment } from 'react';
import { Table, Row, Button, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { NavLink } from 'umi';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      id: 415,
    },
  ];

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'center',
        title: 'ID Merchant',
      },
      {
        align: 'center',
        title: 'Merchant',
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
      {
        align: 'center',
        title: 'Detail Penjualan',
        render: (props: any) => (
          <Row justify="center">
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => remove(props.id)}
              type="primary"
            >
              <NavLink to={`/penjualan/detail/${props.id}`}>Lihat Detail</NavLink>
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return (
    <Card>
      <Row justify="space-between">
        <p className={styles.title}>Penjualan Per Merchant</p>
        <div className={styles.row_box}>
          <Button className={styles.button} type="primary">
            <DownloadOutlined /> Download CSV
          </Button>
        </div>
      </Row>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default TableComponent;
