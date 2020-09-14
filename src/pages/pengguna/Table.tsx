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
  onLoadButton: boolean;
  visibleUpdate: (id: string) => void;
  onDeactive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  onLoadButton,
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
        title: 'ID Pengguna',
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        align: 'center',
        title: 'No. Telepon',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        align: 'center',
        title: 'Tanggal Lahir',
        dataIndex: 'dob',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        key: 'dob',
      },
      // {
      //   align: 'center',
      //   title: 'Usia',
      // },
      {
        align: 'center',
        title: 'Jenis Kelamin',
        dataIndex: 'gender',
        render: (props) => <p>{props === 'L' ? 'Laki-Laki' : 'Perempuan'}</p>,
        key: 'gender',
      },
      // {
      //   align: 'center',
      //   title: 'Alamat Utama',
      // },
      {
        align: 'center',
        title: 'Metode Sign In',
        dataIndex: 'login_method',
        key: 'login_method',
      },
      {
        align: 'center',
        title: 'Tanggal Terdaftar',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        dataIndex: 'created_at',
        key: 'created_at',
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
              disabled={onLoadButton}
            >
              Deactivate
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDelete(props.id)}
              type="primary"
              disabled={onLoadButton}
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
