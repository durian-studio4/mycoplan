import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      id: 1,
      nama: 'test',
      email: 'leikosuko@gmail.com',
    },
  ];

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
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
        dataIndex: 'nama',
        key: 'nama',
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
      },
      {
        align: 'center',
        title: 'Tanggal Lahir',
      },
      {
        align: 'center',
        title: 'Usia',
      },
      {
        align: 'center',
        title: 'Jenis Kelamin',
      },
      {
        align: 'center',
        title: 'Alamat Utama',
      },
      {
        align: 'center',
        title: 'Metode Sign In',
      },
      {
        align: 'center',
        title: 'Tanggal Terdaftar',
      },
      {
        align: 'center',
        title: 'Status',
        key: 'status',
        render: ({ id }: any) => (id === 1 ? <p>Active</p> : <p>Deactive</p>),
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 150,
        render: (props: any) => (
          <Row justify="center">
            <Button
              className={styles.button_action}
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
              Deactive
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

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />;
};

export default TableComponent;
