import React, { useMemo, Fragment } from 'react';
import { Table, Row, Button, Card } from 'antd';
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
      },
      {
        align: 'center',
        title: 'Gambar',
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
        title: 'Action',
        render: (props: any) => (
          <Row justify="space-around">
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

  return (
    <Card style={{ marginBottom: '1em' }}>
      <p className={styles.title}>Resep Pilihan</p>
      <Table columns={columns} />
      <Button className={styles.button_add}>+ Tambah Resep Pilihan</Button>
    </Card>
  );
};

export default TableComponent;
