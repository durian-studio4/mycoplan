import React, { useMemo, Fragment } from 'react';
import { Row, Button } from 'antd';
import { NavLink } from 'umi';
import styles from '../index.less';

import { useDeliveryButton, usePickUpButton } from './useActionButton';

import useFilterColumn from '@/hooks/useFilterColumn';
interface DeliveryProps {
  loading: boolean;
  status_pengiriman: string;
  updateDelivery: (id: string, status: string) => void;
  handleVisible: (id: string) => void;
  handleVisiblePesanan: (
    id: string,
    nama: string | null,
    noTelp: string | null,
    merchantName: string | null,
  ) => void;
}

export const useTableDelivery = ({
  loading,
  status_pengiriman,
  handleVisible,
  handleVisiblePesanan,
  updateDelivery,
}: DeliveryProps) => {
  const [actionDeliveryButton] = useDeliveryButton(status_pengiriman);
  const [getColumnSearchProps] = useFilterColumn();

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
        ...getColumnSearchProps('pesanan'),
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
            <p>{props.jadwal}</p>
            <p>
              {props.start} - {props.end}
            </p>
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
        render: ({
          id,
          id_status,
          nama,
          telepon,
          merchant,
        }: {
          id: string;
          id_status: number;
          nama: string | null;
          telepon: string | null;
          merchant: string | null;
        }) => (
          <Row justify="center">
            {actionDeliveryButton({
              id,
              id_status,
              merchant,
              nama,
              telepon,
              handleVisible,
              loading: Boolean(loading),
              handleVisiblePesanan,
              updateDelivery,
            })}

            <Button className={styles.button_action} disabled={Boolean(loading)} type="primary">
              <NavLink to={`/pesanan/detail/merchant/${id}`}>Lihat Detail</NavLink>
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
  const [getColumnSearchProps] = useFilterColumn();

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
        ...getColumnSearchProps('pesanan'),
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
            <p>{props.jadwal}</p>
            <p>
              {props.start} - {props.end}
            </p>
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
              <NavLink to={`/pesanan/detail/merchant/${id}`}>Lihat Detail</NavLink>
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
