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

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      image: data[key].image,
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
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_kategori-${props.id}`}
            style={{ width: '100%', height: '100%' }}
            src={props.image}
          />
        ),
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Kategori Resep',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'center',
        title: 'Action',
        width: 200,
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
    <Card>
      <p className={styles.title}>Kategori Resep Pilihan</p>
      <Table columns={columns} dataSource={data_array} loading={loading} />

      <Button className={styles.button_add}>
        <NavLink to="/recipe/kategori">+ Tambah Kategori Pilihan</NavLink>
      </Button>
    </Card>
  );
};

export default TableComponent;
