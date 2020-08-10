import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

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
        title: 'No. Pesanan',
        dataIndex: 'pesanan',
        key: 'pesanan',
      },
      {
        align: 'center',
        title: 'Merchant',
        dataIndex: 'merchant',
        key: 'merchant',
      },
      {
        align: 'center',
        title: 'Total Pembayaran (Rp.)',
      },
      {
        align: 'center',
        title: 'Status Pembayaran',
      },
      {
        align: 'center',
        title: 'Tanggal Transaksi',
        dataIndex: 'tanggal',
        key: 'tanggal',
      },
      {
        align: 'center',
        title: 'Jadwal Delivery',
      },
      {
        align: 'center',
        title: 'Nama Penerima',
      },
      {
        align: 'center',
        title: 'Nomor Telepon',
      },
      {
        align: 'center',
        title: 'Detail Pesanan',
        render: () => <Button type="primary">Lihat Detail</Button>,
      },
      {
        align: 'center',
        title: 'Status Pesanan',
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Row justify="space-around">
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Terima
            </Button>
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Batalkan
            </Button>
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Request
            </Button>
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Penyesuaian
            </Button>
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => remove(props.id)}
              type="primary"
              danger
            >
              Pesanan Selesai
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

  return <Table columns={columns} />;
};

export default TableComponent;
