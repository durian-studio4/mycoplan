import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({ data, loading, status, error, onDelete }) => {
  // const [getColumnSearchProps] = useFilterColumn();

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
      },
      {
        align: 'center',
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'left',
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        align: 'center',
        title: 'Peran',
        dataIndex: 'role',
        key: 'role',
      },
      {
        align: 'center',
        title: 'Tanggal Dimasukkan',
        dataIndex: 'created_at',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
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

  return <Table columns={columns} dataSource={data_array} loading={loading} />;
};

export default TableComponent;
