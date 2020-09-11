import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDeactive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  visibleUpdate,
  onDeactive,
  onDelete,
}) => {
  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_kategori-${props.id}`}
            style={{ width: '100%', height: '30%' }}
            src={props.image}
          />
        ),
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Kategori',
        dataIndex: 'category',
        key: 'category',
      },
      {
        align: 'center',
        title: 'Kode Promo',
        dataIndex: 'code',
        key: 'code',
      },
      {
        align: 'center',
        title: 'Diskon (%)',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        align: 'center',
        title: 'Maks. Diskon (Rp)',
        dataIndex: 'max_discount',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'max_discount',
      },
      {
        align: 'center',
        title: 'Min Belanja (Rp)',
        dataIndex: 'min_purchase',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'min_purchase',
      },
      {
        align: 'center',
        title: 'Waktu Mulai',
        dataIndex: 'start',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Waktu Akhir',
        dataIndex: 'end',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Limit Pengguna',
        dataIndex: 'user_limit',
        key: 'user_limit',
      },
      {
        align: 'center',
        title: 'Maks. Penukaran',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        align: 'center',
        title: 'Sudah Ditukar',
        dataIndex: 'used',
        key: 'used',
      },
      // {
      //   align: 'center',
      //   title: 'Total Ditukar (Rp)',
      // },
      {
        align: 'center',
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 150,
        render: (props: any) => (
          <Row justify="space-around">
            <Button
              className={styles.button_edit}
              id={props.id}
              onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDeactive(props.id)}
              type="primary"
            >
              Deactivate
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDelete(props.id)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (error || status !== 200) {
    return <PageError />;
  }

  return <Table columns={columns} dataSource={data} loading={loading} scroll={{ x: 1300 }} />;
};

export default TableComponent;
