import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import styles from './index.less';

import RequestComponent from '../Request';
import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const TableDeliveryComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  const [visible, setVisible] = useState(false);
  const [id_transaction, setIdTransaction] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/merchant/orders/?method=delivery`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const handleVisible = (id: string) => {
    setIdTransaction(Number(id));
    setVisible(!visible);
  };

  const handleVisibleClear = () => {
    setIdTransaction(0);
    setVisible(!visible);
  };

  const updateDelivery = (id: string, id_status: string) => {
    postUpdate(`${REACT_APP_ENV}/merchant/orders/${id}`, JSON.stringify({ id_status }));
  };

  const createRequest = ({ json, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/merchant/gosend-booking`, json, clear);
  };

  let data_array = [];

  for (let key in data_list) {
    data_array.push({
      // no: Number(key) + 1,
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
      start: data_list[key].start_time,
      end: data_list[key].end_time,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'Status Transaksi',
        dataIndex: 'status',
        key: 'status',
      },
      {
        align: 'center',
        title: 'No. Transaksi',
        dataIndex: 'id',
        key: 'id',
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
        title: 'Tanggal Transaksi',
        dataIndex: 'tanggal',
        key: 'tanggal',
      },
      {
        align: 'center',
        title: 'Jadwal Delivery',
        key: 'jadwal',
        render: (props: any) => (
          <Fragment>
            <p>
              {props.start} - {props.end}
            </p>
            <p>{props.jadwal}</p>
          </Fragment>
        ),
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
        title: 'Action',
        fixed: 'right',
        width: 190,
        render: (props: any) => (
          <Row justify="center">
            <Popconfirm
              title="Apakah Anda Ingin Terima?"
              onConfirm={() => updateDelivery(props.id, '3')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading_update) ||
                props.id_status === 6 ||
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
                  props.id_status === 6 ||
                  props.id_status === 8 ||
                  props.id_status === 7 ||
                  props.id_status === 3
                }
                type="primary"
              >
                Terima
              </Button>
            </Popconfirm>

            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => handleVisible(props.id)}
              disabled={
                Boolean(loading_update) ||
                props.id_status === 2 ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7
              }
              type="primary"
            >
              Request Delivery
            </Button>

            <Button
              className={styles.button_action}
              id={props.id}
              disabled={
                Boolean(loading_update) ||
                props.id_status === 2 ||
                props.id_status === 8 ||
                props.id_status === 7
              }
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
                props.id_status === 2 ||
                props.id_status === 8 ||
                props.id_status === 7
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading_update) ||
                  props.id_status === 2 ||
                  props.id_status === 8 ||
                  props.id_status === 7
                }
                type="primary"
              >
                Pesanan Selesai
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Apakah Anda Ingin Batalkan?"
              onConfirm={() => updateDelivery(props.id, '8')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading_update) ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading_update) ||
                  props.id_status === 6 ||
                  props.id_status === 8 ||
                  props.id_status === 7
                }
                type="primary"
              >
                Batalkan
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
        dataSource={data_array.reverse()}
        loading={Boolean(loading_list)}
        scroll={{ x: 1300 }}
      />
      {visible ? (
        <RequestComponent
          visible={visible}
          id_transaction={id_transaction}
          onCreate={createRequest}
          onCancel={handleVisibleClear}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
    </>
  );
};

export default TableDeliveryComponent;
