import React, { useMemo } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  recipe_access: any;
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  recipe_access,
  data,
  loading,
  status,
  error,
  onDelete,
  visibleUpdate,
}) => {
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
        width: 300,
        render: (props) => (
          <img
            alt={`gambar_kategori-${props.id}`}
            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
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
            {recipe_access && recipe_access.update ? (
              <Button
                className={styles.button_edit}
                id={props.id}
                onClick={() => visibleUpdate(props.id)}
                type="primary"
              >
                Edit
              </Button>
            ) : null}
            {recipe_access && recipe_access.delete ? (
              <Popconfirm
                title="Apakah Anda Ingin Delete Kategori Resep Ini?"
                onConfirm={() => onDelete(props.id)}
                okText="Delete"
                cancelText="Batal"
              >
                <Button className={styles.button_action} id={props.id} type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            ) : null}
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipe_access],
  );

  if (error || status !== 200) {
    return <PageError />;
  }

  return <Table columns={columns} dataSource={data_array} loading={loading} />;
};

export default TableComponent;
