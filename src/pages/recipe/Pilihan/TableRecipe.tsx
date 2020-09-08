import React, { useMemo, Fragment } from 'react';
import { NavLink } from 'umi';
import { Table, Row, Button, Card } from 'antd';
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

  return (
    <Card style={{ marginBottom: '1em' }}>
      <p className={styles.title}>Resep Pilihan</p>
      <Table columns={columns} loading={loading} dataSource={data.data} />

      <Button className={styles.button_add}>
        <NavLink to="/recipe/masakan/add">+ Tambah Resep Pilihan</NavLink>
      </Button>
    </Card>
  );
};

export default TableComponent;
