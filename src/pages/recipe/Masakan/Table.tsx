import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      id: 415,
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
        title: 'ID Resep',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Gambar',
        dataIndex: 'gambar',
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Nama Resep',
      },
      {
        align: 'center',
        title: 'Pembuat',
      },
      {
        align: 'center',
        title: 'Link Youtube',
      },
      {
        align: 'center',
        title: 'Durasi Masak',
      },
      {
        align: 'center',
        title: 'Porsi',
      },
      {
        align: 'center',
        title: 'Kesulitan',
      },
      {
        align: 'center',
        title: 'Jenis Makanan',
      },
      {
        align: 'center',
        title: 'Kategori Resep',
      },
      {
        align: 'center',
        title: 'Tanggal Dimasukkan',
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
        width: 140,
        render: (props: any) => (
          <Row justify="center">
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
