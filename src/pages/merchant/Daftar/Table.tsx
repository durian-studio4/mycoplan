import React, { useMemo, useState } from 'react';
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
  // const [getColumnSearchProps] = useFilterColumn();

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
        title: 'ID Merchant',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 300,
        render: (props) => (
          <img alt={`gambar_merchant-${props.id}`} width="50%" height="5%" src={props.logo} />
        ),
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Nama Merchant',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'left',
        title: 'Deskripsi Merchant',
        dataIndex: 'description',
        key: 'description',
      },
      {
        align: 'center',
        title: 'Alamat Merchant',
        dataIndex: 'address',
        key: 'address',
      },
      {
        align: 'center',
        title: 'Tanggal Terdaftar',
        dataIndex: 'created_at',
        render: (props) => <p>{format(new Date(props), 'dd-MM-yyyy')}</p>,
        key: 'tanggal',
      },
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
          <Row justify="center">
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

  return <Table columns={columns} loading={loading} dataSource={data} scroll={{ x: 1300 }} />;
};

export default TableComponent;
