import React, { useMemo, useState, Fragment } from 'react';
import { Table, Row, Button, Card, Popconfirm } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';

import AddComponent from './AddRecipe';

interface Props {
  recipe_access: any;
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onLoadButton: boolean;
  onCreate: ({ json, clear }: any) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  recipe_access,
  data,
  loading,
  status,
  error,
  onLoadButton,
  onCreate,
  onDelete,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible);

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      id_recipe: data[key].recipe.id,
      name: data[key].recipe.name,
      author: data[key].recipe.author,
      images: data[key].recipe.images,
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
        dataIndex: 'id_recipe',
        key: 'id_recipe',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_kategori-${props.id}`}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
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
            {recipe_access && recipe_access.delete ? (
              <Popconfirm
                title="Apakah Anda Ingin Delete Resep Pilihan Ini?"
                onConfirm={() => onDelete(props.id)}
                okText="Delete"
                cancelText="Batal"
              >
                <Button className={styles.button} id={props.id} type="primary" danger>
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

  return (
    <>
      <Card
        style={{
          marginBottom: '1em',
        }}
      >
        <p className={styles.title}>Resep Pilihan</p>
        <Table
          columns={columns}
          loading={loading}
          dataSource={data_array}
          style={{ display: recipe_access && recipe_access.read ? 'block' : 'none' }}
        />
        {recipe_access && recipe_access.create ? (
          <Button className={styles.button_add} onClick={handleVisible}>
            + Tambah Resep Pilihan
          </Button>
        ) : null}
      </Card>
      {visible ? (
        <AddComponent
          visible={visible}
          onCreate={onCreate}
          onCancel={handleVisible}
          onLoadButton={onLoadButton}
        />
      ) : null}
    </>
  );
};

export default TableComponent;
