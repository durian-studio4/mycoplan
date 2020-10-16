import React, { useMemo, useEffect } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const TablePickUpComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/merchant/orders/?method=pickup`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const updateDelivery = (id: string, id_status: string) => {
    postUpdate(`${REACT_APP_ENV}/merchant/orders/${id}`, JSON.stringify({ id_status }));
  };

  let data_array = [];

  for (let key in data_list) {
    data_array.push({
      no: Number(key) + 1,
      id: data_list[key].id,
      id_status: data_list[key].id_status,
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
            <Button
              className={styles.button_action}
              disabled={Boolean(loading_update) || props.id_status === 8 || props.id_status === 7}
              type="primary"
            >
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
              disabled={
                Boolean(loading_update) ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 3
              }
              onClick={() => updateDelivery(props.id, '3')}
              type="primary"
            >
              Terima
            </Button>
            <Popconfirm
              title="Apakah Anda Ingin Batalkan?"
              onConfirm={() => updateDelivery(props.id, '8')}
              okText="Yes"
              cancelText="No"
              disabled={Boolean(loading_update) || props.id_status === 8 || props.id_status === 7}
            >
              <Button
                className={styles.button_action}
                disabled={Boolean(loading_update) || props.id_status === 8 || props.id_status === 7}
                id={props.id}
                type="primary"
              >
                Batalkan
              </Button>
            </Popconfirm>
            <Button
              className={styles.button_action}
              id={props.id}
              disabled={Boolean(loading_update) || props.id_status === 8 || props.id_status === 7}
              type="primary"
            >
              Request
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              disabled={Boolean(loading_update) || props.id_status === 8 || props.id_status === 7}
              onClick={() => updateDelivery(props.id, '6')}
              type="primary"
            >
              Penyesuaian
            </Button>
            <Popconfirm
              title="Apakah Anda Ingin Selesai?"
              onConfirm={() => updateDelivery(props.id, '7')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading_update) ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 3
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading_update) ||
                  props.id_status === 8 ||
                  props.id_status === 7 ||
                  props.id_status === 3
                }
                type="primary"
              >
                Pesanan Selesai
              </Button>
            </Popconfirm>
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
      />
    </>
  );
};

export default TablePickUpComponent;
