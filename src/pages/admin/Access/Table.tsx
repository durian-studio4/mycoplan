import React, { useMemo } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import { NavLink } from 'umi';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';
import useFilterColumn from '@/hooks/useFilterColumn';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({ data, loading, status, error, onDelete }) => {
  const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      email: data[key].email,
      role: data[key].role,
      created_at: data[key].created_at,
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
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      {
        align: 'left',
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email'),
      },
      {
        align: 'center',
        title: 'Peran',
        dataIndex: 'role',
        key: 'role',
        ...getColumnSearchProps('role'),
      },
      {
        align: 'center',
        title: 'Tanggal Dimasukkan',
        dataIndex: 'created_at',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        ...getColumnSearchProps('created_at'),
      },
      // {
      //   align: 'center',
      //   title: 'Status',
      //   key: 'status',
      //   render: ({ id }: any) => {
      //     {
      //       if (id === 1) {
      //         <Radio>Active</Radio>;
      //       }
      //       if (id === 2) {
      //         <Radio>Running</Radio>;
      //       }
      //       if (id === 3) {
      //         <Radio>Banned</Radio>;
      //       }
      //     }
      //   },
      // },
      {
        align: 'center',
        title: 'Action',
        width: 150,
        render: (props: any) => (
          <Row justify="center">
            <Button type="primary" className={styles.button_action}>
              <NavLink to={`/admin/edit/${props.id}`} id={props.id}>
                Edit
              </NavLink>
            </Button>
            <Popconfirm
              title="Apakah Anda Ingin Delete Admin Ini?"
              onConfirm={() => onDelete(props.id)}
              okText="Delete"
              cancelText="Batal"
            >
              <Button className={styles.button_action} id={props.id} type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
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

  return <Table columns={columns} dataSource={data_array} loading={loading} />;
};

export default TableComponent;
