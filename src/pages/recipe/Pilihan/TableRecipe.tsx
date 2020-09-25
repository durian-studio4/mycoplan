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
      author: data[key].author,
      images: data[key].images,
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
        title: 'ID Resep',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_kategori-${props.id}`}
            width="100%"
            height="auto"
            src={props.images[0].url}
          />
        ),
      },
      {
        align: 'center',
        title: 'Nama Resep',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'center',
        title: 'Pembuat',
        dataIndex: 'author',
        key: 'author',
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
      <Table columns={columns} loading={loading} dataSource={data_array} />

      <Button className={styles.button_add}>
        <NavLink to="/recipe/masakan/add">+ Tambah Resep Pilihan</NavLink>
      </Button>
    </Card>
  );
};

export default TableComponent;
