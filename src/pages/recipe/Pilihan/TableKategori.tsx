import React, { useMemo, useState, Fragment } from 'react';
import { Table, Row, Button, Card, Popconfirm } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';

import AddComponent from './AddRecipeKategori';
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
      id_kategori: data[key].recipe_category.id,
      name: data[key].recipe_category.name,
      image: data[key].recipe_category.image,
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
            alt={`gambar_kategori-${props.id_kategori}`}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
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
            {recipe_access && recipe_access.delete ? (
              <Popconfirm
                title="Apakah Anda Ingin Delete Kategori Resep Pilihan Ini?"
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
      <Card>
        <p className={styles.title}>Kategori Resep Pilihan</p>
        <Table
          columns={columns}
          dataSource={data_array}
          loading={loading}
          style={{ display: recipe_access && recipe_access.read ? 'block' : 'none' }}
        />

        {recipe_access && recipe_access.create ? (
          <Button className={styles.button_add} onClick={handleVisible}>
            + Tambah Kategori Pilihan
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
