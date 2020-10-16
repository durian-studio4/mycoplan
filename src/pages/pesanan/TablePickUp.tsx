import React, { useMemo, useEffect } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';

interface Props {
  pesanan_access: any;
}

const TablePickUpComponent: React.FC<Props> = ({ pesanan_access }) => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/orders/?method=pickup`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let data_array = [];

  for (let key in data_list) {
    data_array.push({
      no: Number(key) + 1,
      id: data_list[key].id,
      nama: data_list[key].nama,
      pesanan: data_list[key].no_transaksi,
      merchant: data_list[key].merchant_name,
      total: data_list[key].total_price,
      status: data_list[key].transaction_status,
      tanggal: data_list[key].transaction_date,
      jadwal: data_list[key].jadwal,
      telepon: data_list[key].no_telp,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
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
        dataIndex: 'total',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'total',
      },
      {
        align: 'center',
        title: 'Status Transaksi',
        dataIndex: 'status',
        key: 'status',
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
        dataIndex: 'jadwal',
        key: 'jadwal',
      },
      {
        align: 'center',
        title: 'Nama Penerima',
        dataIndex: 'nama',
        key: 'nama',
      },
      {
        align: 'center',
        title: 'Nomor Telepon',
        dataIndex: 'telepon',
        key: 'telepon',
      },
      {
        align: 'center',
        title: 'Detail Pesanan',
        width: 150,
        render: (props: any) => (
          <NavLink to={`/pesanan/detail/${props.id}`}>
            <Button className={styles.button_action} type="primary">
              Lihat Detail
            </Button>
            ,
          </NavLink>
        ),
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 190,
        render: (props: any) => (
          <Row justify="center">
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Terima
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Batalkan
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Request
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Penyesuaian
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => remove(props.id)}
              type="primary"
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

  return (
    <>
      {error_list || status_list !== 200 ? <PageError /> : null}
      <Table
        columns={columns}
        dataSource={data_array}
        loading={Boolean(loading_list)}
        scroll={{ x: 1300 }}
        style={{ display: pesanan_access && pesanan_access.read ? 'block' : 'none' }}
      />
    </>
  );
};

export default TablePickUpComponent;
