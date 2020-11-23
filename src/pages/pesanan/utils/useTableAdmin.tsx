import React, { useMemo, Fragment } from 'react';
import { Row, Button } from 'antd';
// import moment from 'moment';
import { NavLink } from 'umi';
import styles from '../index.less';

import { useDeliveryButton, usePickUpButton } from './useActionButton';

interface DeliveryProps {
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
  handleVisible: (id: string) => void;
  handleVisiblePesanan: (
    id: string,
    notes: string | null,
    nama: string | null,
    noTelp: string | null,
    merchantName: string | null,
  ) => void;
}

export const useTableDelivery = ({
  loading,
  handleVisible,
  handleVisiblePesanan,
  updateDelivery,
}: DeliveryProps) => {
  const [actionDeliveryButton] = useDeliveryButton();

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
        render: ({
          id,
          id_status,
          notes,
          nama,
          telepon,
          merchant,
        }: {
          id: string;
          id_status: number;
          nama: string | null;
          telepon: string | null;
          merchant: string | null;
          notes: string | null;
        }) => (
          <Row justify="center">
            {actionDeliveryButton({
              id,
              id_status,
              merchant,
              nama,
              telepon,
              notes,
              handleVisible,
              handleVisiblePesanan,
              loading: Boolean(loading),
              updateDelivery,
            })}
            <Button className={styles.button_action} disabled={loading} type="primary">
              <NavLink to={`/pesanan/detail/admin/${id}`}>Lihat Detail</NavLink>
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionDeliveryButton],
  );
  return [columns];
};

interface PickUpProps {
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
}

export const useTablePickUp = ({ loading, updateDelivery }: PickUpProps) => {
  const [actionPickUpButton] = usePickUpButton();
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
        render: ({ id, id_status }: { id: string; id_status: number }) => (
          <Row justify="center">
            {actionPickUpButton({
              id,
              id_status,
              loading: Boolean(loading),
              updateDelivery,
            })}

            <Button className={styles.button_action} disabled={Boolean(loading)} type="primary">
              <NavLink to={`/pesanan/detail/admin/${id}`}>Lihat Detail</NavLink>
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionPickUpButton],
  );

  return [columns];
};
