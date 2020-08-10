import React, { useMemo } from 'react';
import { Table, Row, Button, Radio } from 'antd';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

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
        dataIndex: 'no',
        key: 'no',
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
        render: ({ id }: any) => (id === 1 ? <Radio>Active</Radio> : <Radio>Deactive</Radio>),
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Row justify="space-around">
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Deactive
            </Button>
            <Button
              className={styles.button}
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

  return <Table columns={columns} />;
};

export default TableComponent;
