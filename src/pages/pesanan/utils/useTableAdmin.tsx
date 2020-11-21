import React, { useMemo, Fragment } from 'react';
import { Row, Button, Popconfirm } from 'antd';
// import moment from 'moment';
import { NavLink } from 'umi';
import styles from '../index.less';

interface DeliveryProps {
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
  handleVisible: (id: string) => void;
  handleVisiblePesanan: (id: string, notes: string | null) => void;
}

export const useTableDelivery = ({
  loading,
  handleVisible,
  handleVisiblePesanan,
  updateDelivery,
}: DeliveryProps) => {
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
        render: (props: any) => {
          // console.log(moment(new Date(props.start).getHours(), 'hmm').format('HH:mm'));
          return (
            <Fragment>
              <p>
                {props.start} -{props.end}
              </p>
              <p>{props.jadwal}</p>
            </Fragment>
          );
        },
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
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 3 ||
                props.id_status === 4 ||
                props.id_status === 6 ||
                props.id_status === 7 ||
                props.id_status === 8 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 1 ||
                  props.id_status === 3 ||
                  props.id_status === 4 ||
                  props.id_status === 6 ||
                  props.id_status === 7 ||
                  props.id_status === 8 ||
                  props.id_status === 9
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
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 4 ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
              type="primary"
            >
              Request Delivery
            </Button>

            <Popconfirm
              title="Apakah Anda Ingin Penyesuaian?"
              onConfirm={() => updateDelivery(props.id, '6')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 3 ||
                props.id_status === 6 ||
                props.id_status === 7 ||
                props.id_status === 8 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 1 ||
                  props.id_status === 2 ||
                  props.id_status === 3 ||
                  props.id_status === 6 ||
                  props.id_status === 7 ||
                  props.id_status === 8 ||
                  props.id_status === 9
                }
                type="primary"
              >
                Penyesuaian
              </Button>
            </Popconfirm>

            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => handleVisiblePesanan(props.id, props.notes)}
              disabled={
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 3 ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
              type="primary"
            >
              Lacak Pesanan
            </Button>

            <Popconfirm
              title="Apakah Anda Ingin Selesai?"
              onConfirm={() => updateDelivery(props.id, '7')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 3 ||
                props.id_status === 7 ||
                props.id_status === 8 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 1 ||
                  props.id_status === 2 ||
                  props.id_status === 3 ||
                  props.id_status === 7 ||
                  props.id_status === 8 ||
                  props.id_status === 9
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
              style={{
                backgroundColor: props.id_status === 10 ? '#ff4d4f' : '',
              }}
              disabled={
                Boolean(loading) ||
                props.id_status === 4 ||
                props.id_status === 6 ||
                props.id_status === 7 ||
                props.id_status === 8 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                style={{
                  backgroundColor: props.id_status === 10 ? '#ff4d4f' : '',
                }}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 4 ||
                  props.id_status === 6 ||
                  props.id_status === 7 ||
                  props.id_status === 8 ||
                  props.id_status === 9
                }
                type="primary"
              >
                Batalkan
              </Button>
            </Popconfirm>

            <Button className={styles.button_action} disabled={Boolean(loading)} type="primary">
              <NavLink to={`/pesanan/detail/admin/${props.id}`}>Lihat Detail</NavLink>
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return [columns];
};

interface PickUpProps {
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
}

export const useTablePickUp = ({ loading, updateDelivery }: PickUpProps) => {
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
        title: 'Jadwal Pick Up',
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
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 3 ||
                props.id_status === 5 ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 1 ||
                  props.id_status === 3 ||
                  props.id_status === 5 ||
                  props.id_status === 6 ||
                  props.id_status === 8 ||
                  props.id_status === 7 ||
                  props.id_status === 9
                }
                type="primary"
              >
                Terima
              </Button>
            </Popconfirm>

            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => updateDelivery(props.id, '5')}
              disabled={
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 5 ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
              type="primary"
            >
              Siap Untuk Pick Up
            </Button>

            <Popconfirm
              title="Apakah Anda Ingin Penyesuaian?"
              onConfirm={() => updateDelivery(props.id, '6')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 3 ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 1 ||
                  props.id_status === 2 ||
                  props.id_status === 3 ||
                  props.id_status === 6 ||
                  props.id_status === 8 ||
                  props.id_status === 7 ||
                  props.id_status === 9
                }
                type="primary"
              >
                Penyesuaian
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Apakah Anda Ingin Selesai?"
              onConfirm={() => updateDelivery(props.id, '7')}
              okText="Yes"
              cancelText="No"
              disabled={
                Boolean(loading) ||
                props.id_status === 1 ||
                props.id_status === 2 ||
                props.id_status === 3 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 1 ||
                  props.id_status === 2 ||
                  props.id_status === 3 ||
                  props.id_status === 8 ||
                  props.id_status === 7 ||
                  props.id_status === 9
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
                Boolean(loading) ||
                props.id_status === 6 ||
                props.id_status === 8 ||
                props.id_status === 7 ||
                props.id_status === 9
              }
            >
              <Button
                className={styles.button_action}
                id={props.id}
                disabled={
                  Boolean(loading) ||
                  props.id_status === 6 ||
                  props.id_status === 8 ||
                  props.id_status === 7 ||
                  props.id_status === 9
                }
                type="primary"
              >
                Batalkan
              </Button>
            </Popconfirm>

            <Button className={styles.button_action} disabled={Boolean(loading)} type="primary">
              <NavLink to={`/pesanan/detail/admin/${props.id}`}>Lihat Detail</NavLink>
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [columns];
};
