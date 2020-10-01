import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import useFilterColumn from '@/hooks/useFilterColumn';
import PageError from '@/components/PageError';

interface Props {
  pengguna_access: any;
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onLoadButton: boolean;
  visibleUpdate: (id: string) => void;
  onDeactive: (id: string) => void;
  onActive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  pengguna_access,
  data,
  loading,
  status,
  error,
  onLoadButton,
  visibleUpdate,
  onActive,
  onDeactive,
  onDelete,
}) => {
  const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      email: data[key].email,
      login_method: data[key].login_method,
      phone: data[key].phone,
      tanggal_lahir: data[key].dob,
      tanggal_daftar: data[key].created_at,
      gender: data[key].gender,
      status: data[key].status,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        ...getColumnSearchProps('no'),
      },
      {
        align: 'center',
        title: 'ID Pengguna',
        dataIndex: 'id',
        key: 'id',
        ...getColumnSearchProps('id'),
      },
      {
        align: 'center',
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      {
        align: 'center',
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email'),
      },
      {
        align: 'center',
        title: 'No. Telepon',
        dataIndex: 'phone',
        key: 'phone',
        ...getColumnSearchProps('phone'),
      },
      {
        align: 'center',
        title: 'Tanggal Lahir',
        dataIndex: 'tanggal_lahir',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        key: 'tanggal_lahir',
        ...getColumnSearchProps('tanggal_lahir'),
      },
      // {
      //   align: 'center',
      //   title: 'Usia',
      // },
      {
        align: 'center',
        title: 'Jenis Kelamin',
        dataIndex: 'gender',
        // render: (props) => <p>{props === 'L' ? 'Laki-Laki' : 'Perempuan'}</p>,
        key: 'gender',
        ...getColumnSearchProps('gender'),
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
        ...getColumnSearchProps('login_method'),
      },
      {
        align: 'center',
        title: 'Tanggal Terdaftar',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        dataIndex: 'tanggal_daftar',
        key: 'tanggal_daftar',
        ...getColumnSearchProps('tanggal_daftar'),
      },
      {
        align: 'center',
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ...getColumnSearchProps('status'),
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 150,
        render: (props: any) => (
          <Row justify="center">
            {pengguna_access && pengguna_access.update ? (
              <>
                <Button
                  className={styles.button_edit}
                  id={props.id}
                  onClick={() => visibleUpdate(props.id)}
                  type="primary"
                >
                  Edit
                </Button>
                {props.status === 'active' ? (
                  <Button
                    className={styles.button_action}
                    id={props.id}
                    onClick={() => onDeactive(props.id)}
                    type="primary"
                    disabled={onLoadButton}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    className={styles.button_action}
                    id={props.id}
                    onClick={() => onActive(props.id)}
                    type="primary"
                    disabled={onLoadButton}
                  >
                    Activate
                  </Button>
                )}
              </>
            ) : null}
            {pengguna_access && pengguna_access.delete ? (
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
            ) : null}
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
    <Table
      columns={columns}
      dataSource={data_array}
      loading={loading}
      scroll={{ x: 1300 }}
      style={{ display: pengguna_access && pengguna_access.read ? 'block' : 'none' }}
    />
  );
};

export default TableComponent;
