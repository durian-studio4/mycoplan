import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
}

const TableComponent: React.FC<Props> = ({ data, loading, status, error }) => {
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
      // {
      //   align: 'center',
      //   title: 'Metode Sign In',
      // },
      // {
      //   align: 'center',
      //   title: 'Tanggal Terdaftar',
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
          <Row justify="center">
            <Button
              className={styles.button_edit}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Deactivate
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => remove(props.id)}
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

  return (
    <Table columns={columns} dataSource={data.vouchers} loading={loading} scroll={{ x: 1300 }} />
  );
};

export default TableComponent;
